import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link, useLocation, useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from '@/api/orders-api';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
import { OrderPageItem } from '@/components/order-page/item-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { paymentMethodToTextMap, pickupPoints } from '@/lib/constants';

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
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-6 p-5 sm:py-10">
        {location.state?.isNewOrder && (
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Спасибо за покупку
            </h1>
            <p className="hidden text-xl font-bold sm:inline">
              Мы уже готовим выбранные усы к отправке!
            </p>
          </div>
        )}
        <Card className="p-0">
          <CardContent className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <p className="text-base font-bold">Получатель</p>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <p className="text-base">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
              {order.comment && <p>{order.comment}</p>}
            </div>

            <Separator />

            <div className="grid grid-rows-2 gap-2 sm:grid-cols-2 sm:grid-rows-1">
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

            <div className="flex justify-between gap-5 sm:justify-start">
              <div className="order-2 sm:order-1">
                <p className="text-muted-foreground">Общая сумма</p>
                <p className="font-heading text-end text-xl font-bold sm:text-left sm:text-3xl">
                  {order.totalPrice} ₽
                </p>
              </div>
              <p className="text-muted-foreground">
                {paymentMethodToTextMap[order.paymentMethod]}
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="grid w-full grid-rows-2 items-center justify-stretch sm:flex sm:justify-between">
          <Button onClick={() => window.print()}>Распечатать</Button>
          <Link
            className="text-secondary items-center text-center"
            to={'/profile/orders'}
          >
            Все заказы
          </Link>
        </div>
      </div>

      <MobileMenu />
    </div>
  );
}
