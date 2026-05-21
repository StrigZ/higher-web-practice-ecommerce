import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetProductsQuery } from '@/api/products-api';
import { filterProducts } from '@/lib/filter-products';
import { searchParamsToFilters } from '@/lib/search-params-to-filters';

export function useProducts() {
  const [searchParams] = useSearchParams();
  const filters = searchParamsToFilters(searchParams);
  const { data: products, isLoading } = useGetProductsQuery();

  const filtered = useMemo(
    () => filterProducts(products ?? [], filters),
    [products, filters],
  );

  return { products: filtered, isLoading };
}
