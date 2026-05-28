import { Link } from 'react-router-dom';

import { useGetProductByIdQuery } from '@/api/products-api';

export function OrderPageItem({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { data: product, isLoading } = useGetProductByIdQuery({
    productId,
  });

  if (!product || isLoading) {
    return <p>loadign</p>;
  }

  return (
    <div className="flex items-center">
      <img alt="" className="aspect-square h-20" src={product?.images[0]} />
      <div className="flex flex-col gap-1">
        <Link className="text-secondary text-base" to={`/product/${productId}`}>
          {product?.name}
        </Link>
        <div className="flex gap-1">
          <p className="font-heading text-xl font-bold">{product?.price} ₽</p>
          <p className="text-muted-foreground self-end">{quantity} шт.</p>
        </div>
      </div>
    </div>
  );
}
