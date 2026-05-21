import type { ProductCategory, ProductStyle, ProductThickness } from '@/types';
import type {
  Filters,
  ProductCurliness,
  ProductSort,
  ProductSubcategory,
} from '@/types/product';

export const searchParamsToFilters = (
  searchParams: URLSearchParams,
): Filters => ({
  searchTerm: searchParams.get('search') ?? '',
  category: (searchParams.get('category') as ProductCategory) ?? null,
  subcategory: (searchParams.get('subcategory') as ProductSubcategory) ?? null,
  style: (searchParams.get('style') as ProductStyle) ?? null,
  thickness: (searchParams.get('thickness') as ProductThickness) ?? null,
  curliness: (searchParams.get('curliness') as ProductCurliness) ?? null,
  inStock: searchParams.has('inStock') ? true : null,
  minPrice: searchParams.get('minPrice')
    ? Number(searchParams.get('minPrice'))
    : null,
  maxPrice: searchParams.get('maxPrice')
    ? Number(searchParams.get('maxPrice'))
    : null,
  sortBy: (searchParams.get('sortBy') as ProductSort) ?? 'newest',
});
