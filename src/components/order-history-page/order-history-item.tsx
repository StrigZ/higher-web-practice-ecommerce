import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

import { OrderHistoryCartItem } from './order-history-cart-item';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { Order, OrderStatus, PaymentMethod } from '@/types';

const statusToTextMap: Record<OrderStatus, string> = {
  cancelled: 'Отменен',
  delivered: 'Получен',
  paid: 'Оплачен',
  pending: 'В работе',
  processing: 'Обрабатывается',
  shipped: 'Отправлен',
};

const paymentMethodToTextMap: Record<PaymentMethod, string> = {
  card_on_delivery: 'Оплачено картой',
  card_online: 'Оплачено картой',
  cash: 'Оплачено наличными',
};

export function OrderHistoryItem(order: Order) {
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col gap-4 p-4">
        <Link className="flex" to={`/order/${order.id}`}>
          <div className="flex flex-1 flex-col gap-2">
            <p className="font-heading text-xl font-bold">
              от{' '}
              {format(order.createdAt, "d MMMM yyyy 'г.'", {
                locale: ru,
              })}
            </p>
            <p
              className={cn('text-base font-bold', {
                'text-destructive': order.status === 'cancelled',
                'text-success': order.status === 'delivered',
              })}
            >
              {statusToTextMap[order.status]}{' '}
              {order.status === 'delivered' && (
                <span className="text-muted-foreground text-sm font-normal">
                  {order.deliveryMethod === 'pickup_point'
                    ? 'в пункте выдачи'
                    : 'по адресу'}
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading text-2xl font-bold">
              {order.totalPrice} ₽
            </p>
            <p className="text-muted-foreground text-xs">
              {paymentMethodToTextMap[order.paymentMethod]}
            </p>
          </div>
        </Link>
        <Separator />
        <Accordion collapsible type="single">
          <AccordionItem key={'item-1'} value="item-1">
            <AccordionContent asChild className="h-auto">
              <ul className="flex flex-col gap-4">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    <OrderHistoryCartItem {...item} />
                    <Separator />
                  </li>
                ))}
              </ul>
            </AccordionContent>
            <AccordionTrigger className="text-secondary p-0">
              Показать товары в заказе
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
