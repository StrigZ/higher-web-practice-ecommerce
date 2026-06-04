import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { User } from '@/types';

const API_URL = '/users';

type RegisterUserArgs = Pick<User, 'firstName' | 'lastName' | 'email'> & {
  password: string;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUserById: builder.query<User, { userId: User['id'] }>({
      query: ({ userId }) => ({
        url: `${API_URL}/${userId}`,
      }),
      providesTags: ['Users'],
    }),
    getUserByEmail: builder.query<User[], { email: User['email'] }>({
      query: ({ email }) => ({
        url: API_URL,
        params: { email },
      }),
    }),
    login: builder.query<User[], { email?: string; password: string }>({
      query: ({ password, email }) => ({
        url: API_URL,
        params: { password, email },
      }),
      providesTags: ['Users'],
    }),
    registerUser: builder.mutation<User, RegisterUserArgs>({
      query: (body) => ({
        url: API_URL,
        method: 'POST',
        body: { ...body, language: 'ru', notifyByEmail: false },
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<
      User,
      {
        userId: User['id'];
        data: Pick<
          User,
          'firstName' | 'language' | 'lastName' | 'notifyByEmail'
        >;
      }
    >({
      query: ({ data, userId }) => ({
        url: `${API_URL}/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<User, { userId: User['id'] }>({
      query: ({ userId }) => ({
        url: `${API_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useLoginQuery,
  useLazyLoginQuery,
  useRegisterUserMutation,
  useLazyGetUserByEmailQuery,
  useUpdateUserMutation,
} = usersApi;
