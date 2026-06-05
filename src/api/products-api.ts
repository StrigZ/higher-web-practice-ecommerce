import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Product } from '@/types';

const API_URL = '/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: API_URL,
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
    patchProductRating: builder.mutation({
      query: ({ productId, rating, ratingCount }) => ({
        url: `${API_URL}/${productId}`,
        method: 'PATCH',
        body: { rating, ratingCount },
      }),
      invalidatesTags: (_res, _err, { productId }) => [
        { type: 'Products', id: productId },
        { type: 'Products', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
