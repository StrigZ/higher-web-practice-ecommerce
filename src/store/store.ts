import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { searchFiltersSlice } from './features/search-filter/search-filter-slice';
import { userSlice } from './features/user/user-slice';

import { cartApi } from '@/api/cart-api';
import { ordersApi } from '@/api/orders-api';
import { productsApi } from '@/api/products-api';
import { ratingsApi } from '@/api/ratings-api';
import { usersApi } from '@/api/users-api';

export const rootReducer = combineSlices(
  userSlice,
  searchFiltersSlice,
  productsApi,
  cartApi,
  ordersApi,
  ratingsApi,
  usersApi,
);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      cartApi.middleware,
      ordersApi.middleware,
      ratingsApi.middleware,
      usersApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
