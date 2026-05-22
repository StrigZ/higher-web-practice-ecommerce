import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '@/api/products-api';

export function ProductRating() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery(
    { productId: id! },
    { skip: !id },
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <Star className="fill-primary size-8 stroke-0" size={24} />
        <span className="font-heading text-3xl font-bold">{data.rating}</span>
      </div>
      <span className="text-muted-foreground">{data.ratingCount} оценок</span>
    </div>
  );
}
