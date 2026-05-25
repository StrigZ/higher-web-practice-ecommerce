import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ShoppingCartButton } from '../cart-button';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

import { useRemoveItemMutation } from '@/api/cart-api';
import { useGetProductByIdQuery } from '@/api/products-api';
import type { CartItem, Product } from '@/types';

export function CartItem({
  productId,
  id,
}: {
  productId: Product['id'];
  id: CartItem['id'];
}) {
  const { data: product, isLoading } = useGetProductByIdQuery({ productId });

  const [removeItem] = useRemoveItemMutation();

  const handleRemoveItem = () => {
    removeItem({ id });
  };

  if (isLoading || !product) return null;

  return (
    <Card className="flex flex-row items-center gap-x-8 rounded-[12px] p-4">
      <Link className="flex items-center gap-2" to={`/product/${productId}`}>
        <img
          alt="обложка усов"
          className="relative z-20 aspect-square h-[80px] object-cover"
          src={product.images[0]}
        />
        <p className="text-secondary text-base font-normal">{product.name}</p>
      </Link>
      <ShoppingCartButton product={product} />

      <p className="font-heading text-2xl font-bold">{product.price} ₽</p>

      <Button
        className="text-primary h-10 w-10"
        size={'icon'}
        variant={'ghost'}
        onClick={handleRemoveItem}
      >
        <Trash className="size-6" />
      </Button>
    </Card>
  );
}
