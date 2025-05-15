import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data.map(product => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        description: product.description,
        imageUrl: product.image_url || 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg',
        createdAt: new Date(product.created_at).getTime()
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: product.name,
          price: product.price,
          description: product.description,
          image_url: product.imageUrl,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => [{
        id: data.id,
        name: data.name,
        price: Number(data.price),
        description: data.description,
        imageUrl: data.image_url || 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg',
        createdAt: new Date(data.created_at).getTime()
      }, ...prev]);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
      return false;
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    refreshProducts: fetchProducts
  };
};