CREATE TYPE roll_status AS ENUM ('in_stock', 'depleted', 'remnant_discounted');

CREATE TABLE public.inventory_rolls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE NOT NULL,
    roll_code TEXT UNIQUE NOT NULL,
    dye_lot TEXT,
    initial_length_meters NUMERIC(6, 2) NOT NULL,
    available_meters NUMERIC(6, 2) NOT NULL,
    remnant_threshold NUMERIC(4, 2) DEFAULT 0.80 NOT NULL,
    status roll_status DEFAULT 'in_stock' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.swatch_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    order_item_id UUID REFERENCES public.order_items(id) ON DELETE CASCADE NOT NULL,
    credit_amount NUMERIC(6, 2) DEFAULT 4.00 NOT NULL,
    is_redeemed BOOLEAN DEFAULT FALSE NOT NULL,
    redeemed_at TIMESTAMPTZ,
    redeemed_in_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE OR REPLACE FUNCTION public.allocate_continuous_fabric_cut(
    p_variant_id UUID,
    p_requested_meters NUMERIC
)
RETURNS TABLE (
    roll_id UUID,
    roll_code TEXT,
    dye_lot TEXT
) AS $$
DECLARE
    v_roll record;
BEGIN
    -- Best-fit piece allocation
    SELECT id, roll_code, dye_lot, available_meters, remnant_threshold
    INTO v_roll
    FROM public.inventory_rolls
    WHERE variant_id = p_variant_id
      AND available_meters >= p_requested_meters
      AND status = 'in_stock'
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
            WHEN (available_meters - p_requested_meters) = 0 THEN 'depleted'::roll_status
            WHEN (available_meters - p_requested_meters) <= remnant_threshold THEN 'remnant_discounted'::roll_status
            ELSE 'in_stock'::roll_status
        END,
        updated_at = NOW()
    WHERE id = v_roll.id;

    -- Update cached total_meters_available on public.product_variants
    UPDATE public.product_variants
    SET total_meters_available = (
        SELECT COALESCE(SUM(available_meters), 0)
        FROM public.inventory_rolls
        WHERE variant_id = p_variant_id AND status = 'in_stock'
    )
    WHERE id = p_variant_id;

    RETURN QUERY SELECT v_roll.id, v_roll.roll_code, v_roll.dye_lot;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE public.inventory_rolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swatch_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full mutations on inventory_rolls" 
ON public.inventory_rolls FOR ALL USING (public.is_admin());
CREATE POLICY "Public read in_stock rolls" 
ON public.inventory_rolls FOR SELECT USING (status = 'in_stock' OR public.is_admin());

CREATE POLICY "Users read own swatch credits" 
ON public.swatch_credits FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admin full mutations on swatch_credits" 
ON public.swatch_credits FOR ALL USING (public.is_admin());
