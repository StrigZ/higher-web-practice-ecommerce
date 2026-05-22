import { Star } from 'lucide-react';

import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductRating() {
  const { product } = useProductPageContext();

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <Star className="fill-primary size-8 stroke-0" size={24} />
        <span className="font-heading text-3xl font-bold">
          {product.rating}
        </span>
      </div>
      <span className="text-muted-foreground">
        {product.ratingCount} оценок
      </span>
    </div>
  );
}
