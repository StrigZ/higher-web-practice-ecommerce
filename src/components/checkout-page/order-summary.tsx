import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

import { useGetCurrentUserCart } from '@/hooks/use-get-current-user-cart';
import { cn } from '@/lib/utils';

export function OrderSummary({ className }: { className?: string }) {
  const { quantity, totalPrice } = useGetCurrentUserCart();

  return (
    <Card
      className={cn(
        'flex-1 rounded-none p-0 sm:h-fit sm:rounded-[12px]',
        className,
      )}
    >
      <CardContent className="flex flex-col gap-4 px-5 py-4 sm:p-4">
        <div className="flex items-end justify-between gap-2">
          <p className="font-heading text-xl font-bold">Ваш заказ</p>
          <p className="text-muted-foreground text-xs">{quantity} товара</p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <p className="text-muted-foreground text-base">Сумма заказа</p>
          <p className="font-heading text-xl font-bold">{totalPrice} ₽</p>
        </div>
        <div className="flex items-end justify-between gap-2">
          <p className="text-muted-foreground text-base">Стоимость доставки</p>
          <p className="font-heading text-success text-xl font-bold">
            бесплатно
          </p>
        </div>

        <Separator className="" />

        <div className="flex items-end justify-between gap-2">
          <p className="text-base">Итого</p>
          <p className="font-heading text-success text-2xl font-bold">
            {totalPrice} ₽
          </p>
        </div>
        <Button type="submit">Оплатить</Button>
      </CardContent>
    </Card>
  );
}
