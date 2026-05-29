import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link, useLocation, useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from '@/api/orders-api';
import { OrderPageItem } from '@/components/order-page/item-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pickupPoints } from '@/lib/constants';

export function OrderPage() {
  const location = useLocation();
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(
    { orderId: id! },
    { skip: !id },
  );
  if (!order || isLoading) {
    return <p>loading</p>;
  }
  return (
    <div className="flex flex-col gap-6 py-10">
      {location.state?.isNewOrder && (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Спасибо за покупку</h1>
          <p className="text-xl font-bold">
            Мы уже готовим выбранные усы к отправке!
          </p>
        </div>
      )}
      <Card className="p-0">
        <CardContent className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Получатель</p>
            <div className="flex gap-6">
              <p className="text-base">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-muted-foreground">{order.customer.email}</p>
              <p className="text-muted-foreground">{order.customer.phone}</p>
            </div>
            {order.comment && <p>{order.comment}</p>}
          </div>

          <Separator />

          <div className="grid grid-cols-2">
            <div>
              <p className="text-muted-foreground">
                {order.pickupPointId ? 'Пунк выдачи' : 'Адрес'}
              </p>
              <p className="text-base">
                {order.pickupPointId
                  ? pickupPoints.find(({ id }) => id === order.pickupPointId)
                      ?.address
                  : order.deliveryAddress}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                {order.pickupPointId ? 'Забирать после' : 'Доставят до'}
              </p>
              <p className="text-base">
                {format(addDays(order.createdAt, 7), "d MMMM yyyy 'г.'", {
                  locale: ru,
                })}
              </p>
            </div>
          </div>

          <Separator />
          <ul className="grid auto-cols-max grid-flow-col gap-4 overflow-x-auto">
            {order.items.map((item) => (
              <li key={item.id}>
                <OrderPageItem {...item} />
              </li>
            ))}
          </ul>
          <Separator />

          <div className="flex gap-5">
            <div>
              <p className="text-muted-foreground">Общая сумма</p>
              <p className="font-heading text-3xl font-bold">
                {order.totalPrice} ₽
              </p>
            </div>
            {order.paymentMethod === 'card_online' && (
              <p className="text-muted-foreground">Оплачено картой</p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={() => window.print()}>Распечатать</Button>
        <Link className="text-secondary" to={'/profile/orders'}>
          Все заказы
        </Link>
      </div>
    </div>
  );
}
