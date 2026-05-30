import { useGetUserOrdersQuery } from '@/api/orders-api';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
import { OrderHistoryItem } from '@/components/order-history-page/order-history-item';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';

export function OrderHistoryPage() {
  const { userId } = useGetCurrentUser();
  const { data: orders, isLoading } = useGetUserOrdersQuery(
    { userId: userId! },
    { skip: !userId },
  );

  if (!orders || isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-hidden p-5 sm:p-0">
        <h2 className="text-2xl font-bold">История заказов</h2>
        <ul className="flex h-full flex-col gap-4 overflow-y-scroll">
          {orders.map((order) => (
            <li key={order.id}>
              <OrderHistoryItem {...order} />
            </li>
          ))}
        </ul>
      </div>
      <MobileMenu />
    </div>
  );
}
