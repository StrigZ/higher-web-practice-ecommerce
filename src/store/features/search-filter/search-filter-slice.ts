import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  ProductCategory,
  ProductCurliness,
  ProductStyle,
  ProductThickness,
  ProductSort,
} from '@/types';

export interface SearchFiltersState {
  searchTerm: string;

  category: ProductCategory | null;
  style: ProductStyle | null;
  thickness: ProductThickness | null;
  curliness: ProductCurliness | null;

  isWaxRequired: boolean | null;
  doesIncreasedCharisma: boolean | null;

  minPrice: number | null;
  maxPrice: number | null;

  sortBy: ProductSort;
}

const initialState: SearchFiltersState = {
  searchTerm: '',

  category: null,
  style: null,
  thickness: null,
  curliness: null,

  isWaxRequired: null,
  doesIncreasedCharisma: null,

  minPrice: null,
  maxPrice: null,

  sortBy: 'newest',
};

export const searchFiltersSlice = createSlice({
  name: 'searchFilters',
  initialState,
  selectors: {
    selectAllFilters: (state) => state,
    selectSortBy: (state) => state.sortBy,
  },
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action: PayloadAction<ProductCategory | null>) {
      state.category = action.payload;
    },
    setThickness(state, action: PayloadAction<ProductThickness | null>) {
      state.thickness = action.payload;
    },
    setStyle(state, action: PayloadAction<ProductStyle | null>) {
      state.style = action.payload;
    },
    setCurliness(state, action: PayloadAction<ProductCurliness | null>) {
      state.curliness = action.payload;
    },
    setIsWaxRequired(state, action: PayloadAction<boolean>) {
      state.isWaxRequired = action.payload;
    },
    setDoesIncreasedCharisma(state, action: PayloadAction<boolean>) {
      state.doesIncreasedCharisma = action.payload;
    },
    setPriceRange(
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>,
    ) {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },

    setSortBy(state, action: PayloadAction<ProductSort>) {
      state.sortBy = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  resetFilters,
  setCategory,
  setCurliness,
  setDoesIncreasedCharisma,
  setIsWaxRequired,
  setPriceRange,
  setSearchTerm,
  setSortBy,
  setStyle,
  setThickness,
} = searchFiltersSlice.actions;

export const { selectAllFilters, selectSortBy } = searchFiltersSlice.selectors;
