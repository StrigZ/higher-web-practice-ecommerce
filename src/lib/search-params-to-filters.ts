import { productStyles } from './constants';

import type { ProductCategory, ProductStyle, ProductThickness } from '@/types';
import type {
  Filters,
  ProductCurliness,
  ProductSort,
  ProductSubcategory,
} from '@/types/product';

export const parseStyleParam = (param: string | null): string | null => {
  if (!param) return null;
  const validStyles = param
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is ProductStyle =>
      (productStyles as readonly string[]).includes(s),
    );
  return validStyles.length > 0 ? validStyles.join(',') : null;
};

const parseNumericParam = (value: string | null): number | null => {
  if (value === null || value === '') return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

export const searchParamsToFilters = (
  searchParams: URLSearchParams,
): Filters => ({
  searchTerm: searchParams.get('search') ?? null,
  category: (searchParams.get('category') as ProductCategory) ?? null,
  subcategory: (searchParams.get('subcategory') as ProductSubcategory) ?? null,
  style: parseStyleParam(searchParams.get('style')),
  thickness: (searchParams.get('thickness') as ProductThickness) ?? null,
  curliness: (searchParams.get('curliness') as ProductCurliness) ?? null,
  inStock: searchParams.has('inStock') ? true : null,
  minPrice: parseNumericParam(searchParams.get('minPrice')),
  maxPrice: parseNumericParam(searchParams.get('maxPrice')),
  sortBy: (searchParams.get('sortBy') as ProductSort) ?? 'newest',
});
