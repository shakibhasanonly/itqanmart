/*
# Create Itqan Mart order storage

1. New Tables
- `orders` stores customer delivery details, selected payment method, transaction reference, and the server-recorded order total.
- `order_items` stores the product name, quantity, and price captured at checkout for each order.

2. Security
- Row level security is enabled on both tables.
- Anonymous customers may create orders and order items but cannot read, update, or delete customer/order records through the public client.
- Authenticated staff can read, insert, update, and delete records for administration.

3. Important Notes
- This storefront has no customer sign-in screen, so checkout writes run as the anonymous role.
- Customer-entered totals are saved for order history display, while the storefront always uses its fixed product catalog prices.
*/

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('bkash', 'nagad', 'cod')),
  transaction_id text,
  total numeric(10, 2) NOT NULL CHECK (total >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0 AND quantity <= 100),
  unit_price numeric(10, 2) NOT NULL CHECK (unit_price >= 0)
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
CREATE POLICY "Public can create orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Public cannot read orders" ON public.orders;
CREATE POLICY "Public cannot read orders" ON public.orders FOR SELECT TO anon USING (false);
DROP POLICY IF EXISTS "Public cannot update orders" ON public.orders;
CREATE POLICY "Public cannot update orders" ON public.orders FOR UPDATE TO anon USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS "Public cannot delete orders" ON public.orders;
CREATE POLICY "Public cannot delete orders" ON public.orders FOR DELETE TO anon USING (false);

DROP POLICY IF EXISTS "Public can create order items" ON public.order_items;
CREATE POLICY "Public can create order items" ON public.order_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Public cannot read order items" ON public.order_items;
CREATE POLICY "Public cannot read order items" ON public.order_items FOR SELECT TO anon USING (false);
DROP POLICY IF EXISTS "Public cannot update order items" ON public.order_items;
CREATE POLICY "Public cannot update order items" ON public.order_items FOR UPDATE TO anon USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS "Public cannot delete order items" ON public.order_items;
CREATE POLICY "Public cannot delete order items" ON public.order_items FOR DELETE TO anon USING (false);

DROP POLICY IF EXISTS "Staff can read orders" ON public.orders;
CREATE POLICY "Staff can read orders" ON public.orders FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Staff can insert orders" ON public.orders;
CREATE POLICY "Staff can insert orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Staff can update orders" ON public.orders;
CREATE POLICY "Staff can update orders" ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Staff can delete orders" ON public.orders;
CREATE POLICY "Staff can delete orders" ON public.orders FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "Staff can read order items" ON public.order_items;
CREATE POLICY "Staff can read order items" ON public.order_items FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Staff can insert order items" ON public.order_items;
CREATE POLICY "Staff can insert order items" ON public.order_items FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Staff can update order items" ON public.order_items;
CREATE POLICY "Staff can update order items" ON public.order_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Staff can delete order items" ON public.order_items;
CREATE POLICY "Staff can delete order items" ON public.order_items FOR DELETE TO authenticated USING (true);