import { useGetProductsQuery } from '@/api/products-api';

export function useGetProducts() {
  const { data: products, isLoading } = useGetProductsQuery();

  return { products, isLoading };
}
