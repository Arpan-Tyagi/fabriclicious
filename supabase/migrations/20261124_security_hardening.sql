-- ==============================================================================
-- MIGRATION: 20261124_security_hardening.sql
-- Description: Hardens Supabase RLS, patches privilege escalation, secures search_path,
--              locks down table grants (TRUNCATE), creates human-readable customer codes,
--              and sets up webhook deduplication.
-- ==============================================================================

-- 1. Create Dedicated user_roles Table for RBAC (Anti-Privilege Escalation)
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.user_roles FROM anon, authenticated;
GRANT SELECT ON TABLE public.user_roles TO authenticated;

-- Seed existing admin roles from profiles into user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role FROM public.profiles WHERE role = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. Hardened is_admin() Function with Locked search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'::public.user_role
    );
END;
$$;

-- 3. Add Human-Readable Customer Code to Profiles
CREATE SEQUENCE IF NOT EXISTS public.customer_code_seq START WITH 142;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS customer_code TEXT UNIQUE;

-- Function to format customer code (e.g. FAB-2026-000142)
CREATE OR REPLACE FUNCTION public.generate_customer_code()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    RETURN 'FAB-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('public.customer_code_seq')::TEXT, 6, '0');
END;
$$;

-- Backfill existing profiles with customer code if null
UPDATE public.profiles
SET customer_code = public.generate_customer_code()
WHERE customer_code IS NULL;

ALTER TABLE public.profiles 
ALTER COLUMN customer_code SET NOT NULL;

-- 4. Auth.users Trigger: Automatically Provision Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_code TEXT;
BEGIN
    v_code := public.generate_customer_code();
    
    INSERT INTO public.profiles (
        id,
        email,
        customer_code,
        role,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        v_code,
        'customer'::public.user_role,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    
    -- Assign default customer role in user_roles
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer'::public.user_role)
    ON CONFLICT DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Harden Profiles RLS: Strip User Ability to Mutate Role
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Strict column-level protection: users can only update contact/name fields, not role or customer_code
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id OR public.is_admin())
WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()) AND
    customer_code = (SELECT p.customer_code FROM public.profiles p WHERE p.id = auth.uid())
);

-- 6. Harden Orders & Order Items RLS (No Unchecked Public Inserts)
DROP POLICY IF EXISTS "System can create orders" ON public.orders;
DROP POLICY IF EXISTS "System can create order items" ON public.order_items;

CREATE POLICY "Authenticated users can create own orders"
ON public.orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create own order items"
ON public.order_items FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_items.order_id AND o.user_id = auth.uid()
    )
);

-- 7. Harden Support Conversations & Messages RLS (No Permissive TRUE)
DROP POLICY IF EXISTS "System can manage support conversations" ON public.support_conversations;
DROP POLICY IF EXISTS "System can manage support messages" ON public.support_messages;

CREATE POLICY "Users manage own support conversations"
ON public.support_conversations FOR ALL
TO authenticated
USING (auth.uid() = user_id OR public.is_admin())
WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users manage own support messages"
ON public.support_messages FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.support_conversations sc
        WHERE sc.id = support_messages.conversation_id AND (sc.user_id = auth.uid() OR public.is_admin())
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.support_conversations sc
        WHERE sc.id = support_messages.conversation_id AND (sc.user_id = auth.uid() OR public.is_admin())
    )
);

-- 8. Webhook Events Inbox (Idempotency Deduplication)
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT UNIQUE NOT NULL,
    provider TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.webhook_events FROM anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.webhook_events TO service_role;

-- 9. Harden allocate_continuous_fabric_cut with search_path
CREATE OR REPLACE FUNCTION public.allocate_continuous_fabric_cut(
    p_variant_id UUID,
    p_requested_meters NUMERIC
)
RETURNS TABLE (
    roll_id UUID,
    roll_code TEXT,
    dye_lot TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_roll record;
BEGIN
    -- Best-fit piece allocation with row-level lock
    SELECT id, roll_code, dye_lot, available_meters, remnant_threshold
    INTO v_roll
    FROM public.inventory_rolls
    WHERE variant_id = p_variant_id
      AND available_meters >= p_requested_meters
      AND status = 'in_stock'::public.roll_status
    ORDER BY available_meters ASC
    LIMIT 1
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Insufficient continuous yardage available on active bolt';
    END IF;

    -- Update the roll
    UPDATE public.inventory_rolls
    SET available_meters = available_meters - p_requested_meters,
        status = CASE 
            WHEN (available_meters - p_requested_meters) = 0 THEN 'depleted'::public.roll_status
            WHEN (available_meters - p_requested_meters) <= remnant_threshold THEN 'remnant_discounted'::public.roll_status
            ELSE 'in_stock'::public.roll_status
        END,
        updated_at = NOW()
    WHERE id = v_roll.id;

    -- Update cached total_meters_available on public.product_variants
    UPDATE public.product_variants
    SET total_meters_available = (
        SELECT COALESCE(SUM(available_meters), 0)
        FROM public.inventory_rolls
        WHERE variant_id = p_variant_id AND status = 'in_stock'::public.roll_status
    )
    WHERE id = p_variant_id;

    RETURN QUERY SELECT v_roll.id, v_roll.roll_code, v_roll.dye_lot;
END;
$$;

-- 10. Explicit Privilege Lockdown (Revoke TRUNCATE across all public tables)
REVOKE TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

-- 11. Storage Bucket Security: Private Invoices & Credit Notes
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('invoices', 'invoices', false),
    ('credit-notes', 'credit-notes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Users can only download their own invoice PDFs
CREATE POLICY "Users can read own invoice PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id IN ('invoices', 'credit-notes') AND (
        (storage.foldername(name))[1] = auth.uid()::text OR
        public.is_admin()
    )
);

CREATE POLICY "Service role can write invoices"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id IN ('invoices', 'credit-notes'));

