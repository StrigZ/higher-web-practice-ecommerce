import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Order, User } from '@/types';

const API_URL = '/orders';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrderById: builder.query<Order, { orderId: Order['id'] }>({
      query: ({ orderId }) => ({
        url: `${API_URL}/${orderId}`,
      }),
      providesTags: (result) => [{ type: 'Orders', id: result?.id }],
    }),
    getUserOrders: builder.query<Order[], { userId: User['id'] }>({
      query: ({ userId }) => ({
        url: API_URL,
        params: { userId },
      }),
      providesTags: (result) => [
        { type: 'Orders', id: `LIST` },
        ...(result ?? []).map((order) => ({
          type: 'Orders' as const,
          id: order.id,
        })),
      ],
    }),

    createOrder: builder.mutation<Order, Omit<Order, 'id'>>({
      query: (body) => ({
        url: API_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Orders', id: `LIST` }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery,
} = ordersApi;
