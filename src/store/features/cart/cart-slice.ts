import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  AddToCartPayload,
  Cart,
  DecrementQuantityPayload,
  RemoveFromCartPayload,
} from '@/types';

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    selectAllItems: (state) => state.items,
    selectTotalPrice: (state) => state.totalPrice,
    selectTotalItems: (state) => state.totalItems,
  },
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { item: newItem } = action.payload;
      const existing = state.items.find(
        (item) => item.productId === newItem.productId,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push(newItem);
      }

      state.totalItems += 1;
      state.totalPrice += newItem.price;
    },
    decrementItemQuantity(
      state,
      action: PayloadAction<DecrementQuantityPayload>,
    ) {
      const targetItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );
      if (!targetItem) return;

      if (targetItem.quantity > 1) {
        targetItem.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= targetItem.price;
      } else {
        state.totalItems -= 1;
        state.totalPrice -= targetItem.price;
        state.items = state.items.filter(
          (item) => item.productId !== action.payload.productId,
        );
      }
    },
    removeItem(state, action: PayloadAction<RemoveFromCartPayload>) {
      const targetItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );
      if (!targetItem) return;

      state.items = state.items.filter(
        (item) => item.productId !== targetItem.productId,
      );
      state.totalItems -= targetItem.quantity;
      state.totalPrice -= targetItem.price * targetItem.quantity;
    },
  },
});

export const { addToCart, removeItem, decrementItemQuantity } =
  cartSlice.actions;

export const { selectAllItems, selectTotalPrice, selectTotalItems } =
  cartSlice.selectors;
