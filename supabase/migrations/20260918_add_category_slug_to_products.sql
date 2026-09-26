ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_slug TEXT;

CREATE INDEX IF NOT EXISTS products_category_slug_idx ON public.products(category_slug);

UPDATE public.products SET category_slug = 'linen' WHERE title ILIKE '%linen%' OR slug ILIKE '%linen%';
UPDATE public.products SET category_slug = 'cotton' WHERE (title ILIKE '%cotton%' OR slug ILIKE '%cotton%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'viscose' WHERE (title ILIKE '%viscose%' OR slug ILIKE '%viscose%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'flannel' WHERE (title ILIKE '%flannel%' OR slug ILIKE '%flannel%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'corduroy' WHERE (title ILIKE '%corduroy%' OR slug ILIKE '%corduroy%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'twill' WHERE (title ILIKE '%twill%' OR slug ILIKE '%twill%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'suede' WHERE (title ILIKE '%suede%' OR slug ILIKE '%suede%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'velvet' WHERE (title ILIKE '%velvet%' OR slug ILIKE '%velvet%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'wool' WHERE (title ILIKE '%wool%' OR slug ILIKE '%wool%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'fleece' WHERE (title ILIKE '%fleece%' OR slug ILIKE '%fleece%') AND category_slug IS NULL;
UPDATE public.products SET category_slug = 'tweed' WHERE (title ILIKE '%tweed%' OR slug ILIKE '%tweed%') AND category_slug IS NULL;
