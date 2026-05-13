import type { Product } from './product';

export type CartItem = {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
};

export type AddToCartPayload = {
  item: CartItem;
};

export type DecrementQuantityPayload = {
  productId: CartItem['productId'];
};

export type RemoveFromCartPayload = {
  productId: CartItem['productId'];
};
