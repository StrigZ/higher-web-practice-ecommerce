import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CartItem } from '@/types';

const API_URL = '/cart';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], { userId: string }>({
      query: ({ userId }) => ({
        url: API_URL,
        params: { userId },
      }),
      providesTags: ['Cart'],
    }),

    addItem: builder.mutation<CartItem, CartItem>({
      query: (item) => ({
        url: API_URL,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),
    decrementItemQuantity: builder.mutation<
      CartItem,
      { id: string; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `${API_URL}/${id}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeItem: builder.mutation<CartItem, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemMutation,
  useDecrementItemQuantityMutation,
  useRemoveItemMutation,
} = cartApi;
