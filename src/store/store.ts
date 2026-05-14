import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { cartSlice } from './features/cart/cart-slice';
import { searchFiltersSlice } from './features/search-filter/search-filter-slice';

export const rootReducer = combineSlices(cartSlice, searchFiltersSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
