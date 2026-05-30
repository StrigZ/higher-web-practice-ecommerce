import { Link } from 'react-router-dom';

import { buttonVariants } from '../ui/button';
import { Card, CardContent } from '../ui/card';

import { cn } from '@/lib/utils';

export function CartSummary({
  quantity,
  totalPrice,
  className,
}: {
  quantity: number;
  totalPrice: number;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        'rounded-none p-0 shadow-none sm:h-fit sm:w-[280px] sm:rounded-[12px] sm:shadow-xs',
        className,
      )}
    >
      <CardContent className="grid gap-2 px-5 py-4 sm:gap-4 sm:p-4 sm:pt-5">
        <div className="hidden items-end justify-between gap-2 sm:flex">
          <p className="font-heading text-xl font-bold">Ваша корзина</p>
          <p className="text-muted-foreground text-xs">{quantity} товара</p>
        </div>

        <div className="hidden items-end justify-between sm:flex">
          <p className="text-muted-foreground text-xs">сумма заказа</p>
          <p className="font-heading text-success text-3xl font-bold">
            {' '}
            {totalPrice} ₽
          </p>
        </div>

        <div className="flex items-center justify-between sm:hidden">
          <p className="font-heading text-success text-xl font-bold">
            {' '}
            {totalPrice} ₽
          </p>
          <p className="text-muted-foreground">{quantity} товара</p>
        </div>
        <Link className={buttonVariants()} to="/checkout">
          Оформить заказ
        </Link>
      </CardContent>
    </Card>
  );
}
