import type { SearchFiltersState } from '@/store/features/search-filter/search-filter-slice';

type QueryParams = {
  name_like?: string;
  category?: string;
  price_gte?: number;
  price_lte?: number;
  curliness?: string;
  thickness?: string;
  style?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
};
export const buildQueryParams = (filters: SearchFiltersState) => {
  const params: QueryParams = {};

  if (filters.searchTerm) params.name_like = filters.searchTerm;
  if (filters.category) params.category = filters.category;
  if (filters.minPrice !== null) params.price_gte = filters.minPrice;
  if (filters.maxPrice !== null) params.price_lte = filters.maxPrice;
  if (filters.curliness) params.curliness = filters.curliness;
  if (filters.thickness) params.thickness = filters.thickness;
  if (filters.style) params.style = filters.style;

  if (filters.sortBy === 'newest') {
    params._sort = 'createdAt';
    params._order = 'desc';
  } else if (filters.sortBy === 'price_asc') {
    params._sort = 'price';
    params._order = 'asc';
  } else if (filters.sortBy === 'price_desc') {
    params._sort = 'price';
    params._order = 'desc';
  } else if (filters.sortBy === 'rating') {
    params._sort = 'rating';
    params._order = 'desc';
  }

  return params;
};
