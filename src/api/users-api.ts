import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { User } from '@/types';

const API_URL = '/users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    // queries
    // get user info
    getUserById: builder.query<User, { userId: User['id'] }>({
      query: ({ userId }) => ({
        url: `${API_URL}/${userId}`,
      }),
      providesTags: ['Users'],
    }),
    login: builder.query<
      User[],
      { email?: string; userName?: string; password: string }
    >({
      query: ({ password, email, userName }) => {
        const params: Record<string, string> = { password };
        if (email) params.email = email;
        if (userName) params.userName = userName;

        return { url: API_URL, params };
      },
      providesTags: ['Users'],
    }),
    //mutations
    // register user
    registerUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (body) => ({
        url: API_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    // update user
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
    // delete user
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
  useRegisterUserMutation,
} = usersApi;
