import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { buildQueryParams } from '@/lib/utils/build-query-params';
import type { SearchFiltersState } from '@/store/features/search-filter/search-filter-slice';
import type { Product } from '@/types';

const API_URL = '/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], SearchFiltersState>({
      query: (filters) => ({
        url: API_URL,
        params: buildQueryParams(filters),
      }),
      providesTags: (result) => [
        { type: 'Products', id: 'LIST' },
        ...(result ?? []).map((product) => ({
          type: 'Products' as const,
          id: product.id,
        })),
      ],
    }),
    getProductById: builder.query<Product, { productId: Product['id'] }>({
      query: ({ productId }) => ({
        url: `${API_URL}/${productId}`,
      }),
      providesTags: (_res, _er, { productId }) => [
        { type: 'Products', id: productId },
      ],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
