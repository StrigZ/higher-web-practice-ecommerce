import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

import { useCreateOrderMutation } from '@/api/orders-api';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { useGetCurrentUserCart } from '@/hooks/use-get-current-user-cart';

export function OrderSummary() {
  const { cartItems, quantity, totalPrice } = useGetCurrentUserCart();

  const { user } = useGetCurrentUser();

  const [createOrder] = useCreateOrderMutation();

  const handleConfirmOrder = () => {
    if (!user) return;

    //   TODO: get from form
    createOrder({
      createdAt: new Date().toISOString(),
      items: cartItems,
      userId: user.id,
      totalPrice,
      status: 'processing',

      customer: { ...user, phone: user.phone ?? '' },
      deliveryMethod: 'courier',
      paymentMethod: 'card_on_delivery',
      comment: 'test',
      deliveryAddress: {
        country: 'string',
        city: 'string',
        street: 'string',
        house: 'string',
        apartment: 'string',
        postalCode: 'string',
      },
      pickupPointId: 'test',
    });
  };

  return (
    <Card className="h-fit flex-1 gap-4 p-4 pt-5">
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
        <p className="font-heading text-success text-xl font-bold">бесплатно</p>
      </div>

      <Separator className="" />

      <div className="flex items-end justify-between gap-2">
        <p className="text-base">Итого</p>
        <p className="font-heading text-success text-2xl font-bold">
          {totalPrice} ₽
        </p>
      </div>
      <Button onClick={handleConfirmOrder}>Оплатить</Button>
    </Card>
  );
}
