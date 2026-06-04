import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ShoppingCartButton } from '../cart-button';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

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
    <div className="flex flex-col gap-3">
      <Card className="bg-background sm:bg-card rounded-none p-0 shadow-none sm:rounded-[12px] sm:shadow-xs">
        <CardContent className="flex items-center gap-2 p-0 sm:flex-row sm:justify-center sm:gap-x-8 sm:p-4">
          <img
            alt="обложка усов "
            className="relative aspect-square h-[60px] rounded-none object-cover sm:hidden"
            src={product.images[0]}
          />

          <Link
            className="hidden flex-col items-center gap-2 sm:flex lg:flex-row"
            to={`/product/${productId}`}
          >
            <img
              alt="обложка усов "
              className="relative aspect-square h-[80px] object-cover"
              src={product.images[0]}
            />
            <p className="text-secondary max-w-40 flex-1 truncate text-base font-normal">
              {product.name}
            </p>
          </Link>

          <div className="flex-1">
            <Link
              className="text-secondary font-normal sm:hidden sm:text-base"
              to={`/product/${productId}`}
            >
              {product.name}
            </Link>

            <ShoppingCartButton className="justify-start" product={product} />
          </div>

          <div className="flex flex-col items-center sm:flex-row">
            <p className="font-heading font-bold sm:text-2xl">
              {product.price} ₽
            </p>

            <Button
              className="text-primary w-10"
              size={'icon'}
              variant={'ghost'}
              onClick={handleRemoveItem}
            >
              <Trash className="size-4 sm:size-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="sm:hidden">
        <p className="text-muted-foreground text-xs">Доставят</p>
        <p>
          {format(addDays(product.createdAt, 7), "d MMMM yyyy 'г.'", {
            locale: ru,
          })}
        </p>
      </div>
    </div>
  );
}
