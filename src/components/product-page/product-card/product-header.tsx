import { useParams } from 'react-router-dom';

import { ProductRating } from './product-rating';

import { useGetProductByIdQuery } from '@/api/products-api';
import { CardDescription, CardTitle } from '@/components/ui/card';

export function ProductHeader() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery(
    { productId: id! },
    { skip: !id },
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-6">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          <p className="text-success font-heading text-3xl font-bold">
            {data.price} ₽
          </p>
        </CardDescription>
      </div>
      <ProductRating />
    </div>
  );
}
