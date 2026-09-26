CREATE OR REPLACE FUNCTION public.deduct_inventory_for_order(p_order_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    item RECORD;
BEGIN
    FOR item IN SELECT variant_id, length_meters FROM public.order_items WHERE order_id = p_order_id AND is_swatch = FALSE
    LOOP
        UPDATE public.product_variants
        SET total_meters_available = total_meters_available - item.length_meters
        WHERE id = item.variant_id;
        
        -- The CHECK constraint (total_meters_available >= 0) will cause an exception if inventory is insufficient.
    END LOOP;
END;
$$;
