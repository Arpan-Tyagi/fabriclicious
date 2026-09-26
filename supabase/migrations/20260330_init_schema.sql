CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('customer', 'atelier_trade', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'cut_in_progress', 'dispatched', 'delivered', 'cancelled', 'refunded');
CREATE TYPE drape_profile AS ENUM ('ultra_fluid', 'fluid', 'moderate', 'structured', 'rigid');
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed_amount', 'free_swatch_pack');
CREATE TYPE support_status AS ENUM ('active', 'escalated', 'resolved');

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    role user_role DEFAULT 'customer' NOT NULL,
    whatsapp_opt_in BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    care_instructions TEXT,
    base_price_per_meter NUMERIC(10, 2) NOT NULL CHECK (base_price_per_meter > 0),
    swatch_price NUMERIC(10, 2) DEFAULT 4.00 NOT NULL CHECK (swatch_price >= 0),
    swatch_available BOOLEAN DEFAULT TRUE NOT NULL,
    minimum_cut NUMERIC(4, 2) DEFAULT 0.50 NOT NULL CHECK (minimum_cut >= 0.1),
    cut_step NUMERIC(4, 2) DEFAULT 0.10 NOT NULL CHECK (cut_step > 0),
    gsm INTEGER NOT NULL CHECK (gsm > 0),
    width_cm NUMERIC(5, 2) NOT NULL CHECK (width_cm > 0),
    composition JSONB NOT NULL,
    weave TEXT NOT NULL,
    drape drape_profile NOT NULL,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    seo_metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    color_name TEXT NOT NULL,
    color_hex TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    total_meters_available NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK (total_meters_available >= 0),
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number BIGSERIAL UNIQUE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    status order_status DEFAULT 'pending' NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    shipping_cost NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    shipping_address JSONB NOT NULL,
    tracking_number TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    variant_id UUID REFERENCES public.product_variants(id) NOT NULL,
    is_swatch BOOLEAN DEFAULT FALSE NOT NULL,
    length_meters NUMERIC(6, 2) CHECK (
        (is_swatch = TRUE AND length_meters IS NULL) OR 
        (is_swatch = FALSE AND length_meters >= 0.1)
    ),
    unit_price NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE public.discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    type discount_type NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    min_order_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    start_date TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content_markdown TEXT NOT NULL,
    excerpt TEXT,
    hero_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.support_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    session_id TEXT UNIQUE NOT NULL,
    status support_status DEFAULT 'active' NOT NULL,
    last_message_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.support_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.support_conversations(id) ON DELETE CASCADE NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'ai', 'admin')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    items JSONB DEFAULT '[]'::jsonb NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security Setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Products Policies
CREATE POLICY "Public products viewable when published" 
ON public.products FOR SELECT USING (is_published = TRUE OR public.is_admin());
CREATE POLICY "Admin full mutations on products" 
ON public.products FOR ALL USING (public.is_admin());

-- Variants Policies
CREATE POLICY "Public variants viewable" 
ON public.product_variants FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.products 
    WHERE products.id = product_variants.product_id 
    AND (products.is_published = TRUE OR public.is_admin())
));
CREATE POLICY "Admin full mutations on variants" 
ON public.product_variants FOR ALL USING (public.is_admin());

-- Orders & Items Policies
CREATE POLICY "Users can read their own orders" 
ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "System can create orders" 
ON public.orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin full mutations on orders" 
ON public.orders FOR ALL USING (public.is_admin());

CREATE POLICY "Users can read their own order items" 
ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "System can create order items" 
ON public.order_items FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin full mutations on order items" 
ON public.order_items FOR ALL USING (public.is_admin());

-- Profiles Policies
CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- Carts Policies
CREATE POLICY "Users can manage their own cart"
ON public.carts FOR ALL USING (auth.uid() = user_id);

-- Blogs Policies
CREATE POLICY "Public blogs viewable when published" 
ON public.blog_posts FOR SELECT USING (is_published = TRUE OR public.is_admin());
CREATE POLICY "Admin full mutations on blogs" 
ON public.blog_posts FOR ALL USING (public.is_admin());

-- Discounts Policies (Read-only for public validation)
CREATE POLICY "Public can read active discounts" 
ON public.discounts FOR SELECT USING (is_active = TRUE OR public.is_admin());
CREATE POLICY "Admin full mutations on discounts" 
ON public.discounts FOR ALL USING (public.is_admin());

-- Support Policies
CREATE POLICY "Users can read their own conversations" 
ON public.support_conversations FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "System can manage support conversations" 
ON public.support_conversations FOR ALL USING (TRUE); -- Webhooks handle this

CREATE POLICY "Users can read their own messages" 
ON public.support_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.support_conversations WHERE support_conversations.id = support_messages.conversation_id AND (support_conversations.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "System can manage support messages" 
ON public.support_messages FOR ALL USING (TRUE);
