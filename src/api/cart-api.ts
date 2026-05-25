import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CartItem, User } from '@/types';

const API_URL = '/cart';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], { userId: User['id'] }>({
      query: ({ userId }) => ({
        url: API_URL,
        params: { userId },
      }),
      providesTags: ['Cart'],
    }),
    addItem: builder.mutation<CartItem, Omit<CartItem, 'id'>>({
      query: (item) => ({
        url: API_URL,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateItemQuantity: builder.mutation<
      CartItem,
      { id: CartItem['id']; quantity: CartItem['quantity'] }
    >({
      query: ({ id, quantity }) => ({
        url: `${API_URL}/${id}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeItem: builder.mutation<CartItem, { id: CartItem['id'] }>({
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
  useUpdateItemQuantityMutation,
  useRemoveItemMutation,
} = cartApi;
