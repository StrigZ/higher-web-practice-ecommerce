import { Link } from 'react-router-dom';

import { useGetProductByIdQuery } from '@/api/products-api';

export function OrderHistoryCartItem({
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
    return <p>loading...</p>;
  }

  return (
    <div className="flex w-full items-center gap-2">
      <img alt="" className="aspect-square h-20" src={product.images[0]} />
      <div className="flex flex-1 items-center justify-between gap-1">
        <div className="flex flex-col gap-1">
          <Link
            className="text-secondary text-base"
            to={`/product/${productId}`}
          >
            {product?.name}
          </Link>
          <p className="text-muted-foreground">{quantity} шт.</p>
        </div>
        <p className="text-base">{product?.price} ₽</p>
      </div>
    </div>
  );
}
