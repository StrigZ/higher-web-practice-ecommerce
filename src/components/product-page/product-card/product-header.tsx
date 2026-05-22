import { ProductRating } from './product-rating';

import { CardDescription, CardTitle } from '@/components/ui/card';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductHeader() {
  const { product } = useProductPageContext();

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-6">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          <p className="text-success font-heading text-3xl font-bold">
            {product.price} ₽
          </p>
        </CardDescription>
      </div>
      <ProductRating />
    </div>
  );
}
