import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { cartSlice } from './features/cart/cart-slice';
import { searchFiltersSlice } from './features/search-filter/search-filter-slice';
import { userSlice } from './features/user/user-slice';

export const rootReducer = combineSlices(
  cartSlice,
  searchFiltersSlice,
  userSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
