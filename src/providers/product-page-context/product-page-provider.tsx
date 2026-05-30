import { type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { ProductPageContext } from './product-page-context';

import { useGetProductByIdQuery } from '@/api/products-api';
import { useGetProductRatingsQuery } from '@/api/ratings-api';

export function ProductPageProvider({ children }: { children: ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(
    { productId: id! },
    { skip: !id },
  );
  const { data: ratings, isLoading: isRatingsLoading } =
    useGetProductRatingsQuery({ productId: id! }, { skip: !id });

  if (isProductLoading || isRatingsLoading || !product || !ratings) {
    return <p>Loading...</p>;
  }

  const value: ProductPageContext = {
    product,
    ratings,
  };

  return (
    <ProductPageContext.Provider value={value}>
      {children}
    </ProductPageContext.Provider>
  );
}
