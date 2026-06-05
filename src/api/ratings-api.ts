import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { productsApi } from './products-api';

import type { Product, ProductRating } from '@/types';

const API_URL = '/ratings';

export const ratingsApi = createApi({
  reducerPath: 'ratingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Ratings'],
  endpoints: (builder) => ({
    getProductRatings: builder.query<
      ProductRating[],
      { productId: Product['id'] }
    >({
      query: ({ productId }) => ({
        url: API_URL,
        params: { productId },
      }),
      providesTags: (result, _, { productId }) => [
        { type: 'Ratings', id: `LIST-${productId}` },
        ...(result ?? []).map((rating) => ({
          type: 'Ratings' as const,
          id: rating.id,
        })),
      ],
    }),
    addRating: builder.mutation<ProductRating, Omit<ProductRating, 'id'>>({
      query: (body) => ({
        url: API_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _, { productId }) => [
        { type: 'Ratings', id: `LIST-${productId}` },
      ],
      onQueryStarted: async ({ productId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          const { data: ratings } = await dispatch(
            ratingsApi.endpoints.getProductRatings.initiate(
              { productId },
              { forceRefetch: true },
            ),
          );
          if (!ratings?.length) return;
          const avg =
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
          await dispatch(
            productsApi.endpoints.patchProductRating.initiate({
              productId,
              rating: avg,
              ratingCount: ratings.length,
            }),
          );
        } catch (error) {
          console.error('Failed to recalculate product rating:', error);
        }
      },
    }),
    updateRating: builder.mutation<
      ProductRating,
      {
        ratingId: ProductRating['id'];
        productId: Product['id'];
        rating: ProductRating['rating'];
      }
    >({
      query: ({ rating, ratingId }) => ({
        url: `${API_URL}/${ratingId}`,
        method: 'PATCH',
        body: { rating },
      }),
      invalidatesTags: (_result, _, { ratingId, productId }) => [
        { type: 'Ratings', id: ratingId },
        { type: 'Ratings', id: `LIST-${productId}` },
      ],
      onQueryStarted: async ({ productId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          const { data: ratings } = await dispatch(
            ratingsApi.endpoints.getProductRatings.initiate(
              { productId },
              { forceRefetch: true },
            ),
          );
          if (!ratings?.length) return;
          const avg =
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
          await dispatch(
            productsApi.endpoints.patchProductRating.initiate({
              productId,
              rating: avg,
              ratingCount: ratings.length,
            }),
          );
        } catch (error) {
          console.error('Failed to recalculate product rating:', error);
        }
      },
    }),
  }),
});

export const {
  useAddRatingMutation,
  useGetProductRatingsQuery,
  useUpdateRatingMutation,
} = ratingsApi;
