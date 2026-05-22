import { useContext } from 'react';

import { ProductPageContext } from './product-page-context';

export function useProductPageContext(): ProductPageContext {
  const context = useContext(ProductPageContext);

  if (!context) {
    throw new Error(
      'useProductPageContext must be used within ProductPageContext.Provider',
    );
  }

  return context;
}
