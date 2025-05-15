/*
  # Update Products Table RLS Policies

  1. Changes
    - Drop existing restrictive policies
    - Add new policies for:
      - Reading products (all authenticated users can read all products)
      - Creating products (users can only create products they own)
      - Updating products (users can only update their own products)
      - Deleting products (users can only delete their own products)

  2. Security
    - Maintains RLS enabled on products table
    - Ensures users can only modify their own products
    - Allows all authenticated users to view all products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create products" ON products;
DROP POLICY IF EXISTS "Users can read own products" ON products;

-- Create new policies
CREATE POLICY "Anyone can view all products"
ON products FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create their own products"
ON products FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
ON products FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
ON products FOR DELETE
TO authenticated
USING (auth.uid() = user_id);