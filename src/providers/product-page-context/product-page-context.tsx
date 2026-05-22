import { createContext } from 'react';

import type { Product, ProductRating } from '@/types';

export type ProductPageContext = {
  product: Product;
  ratings: ProductRating[];
};
export const ProductPageContext = createContext<ProductPageContext | null>(
  null,
);
