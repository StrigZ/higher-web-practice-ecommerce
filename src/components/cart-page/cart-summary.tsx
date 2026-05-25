import { Link } from 'react-router-dom';

import { buttonVariants } from '../ui/button';
import { Card } from '../ui/card';

export function CartSummary({
  quantity,
  totalPrice,
}: {
  quantity: number;
  totalPrice: number;
}) {
  return (
    <Card className="h-fit w-[280px] p-4 pt-5">
      <div className="flex items-end justify-between gap-2">
        <p className="font-heading text-xl font-bold">Ваша корзина</p>
        <p className="text-muted-foreground text-xs">{quantity} товара</p>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-muted-foreground text-xs">сумма заказа</p>
        <p className="font-heading text-success text-3xl font-bold">
          {' '}
          {totalPrice} ₽
        </p>
      </div>
      <Link className={buttonVariants()} to="/checkout">
        Оформить заказ
      </Link>
    </Card>
  );
}
