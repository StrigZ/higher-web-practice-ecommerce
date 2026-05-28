import { useGetUserOrdersQuery } from '@/api/orders-api';
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
    <div className="flex h-full flex-1 flex-col gap-4 overflow-y-hidden">
      <h2 className="text-2xl font-bold">История заказов</h2>
      <ul className="flex h-full flex-col gap-4 overflow-y-scroll pr-2 pb-2">
        {orders.map((order) => (
          <li key={order.id}>
            <OrderHistoryItem {...order} />
          </li>
        ))}
      </ul>
    </div>
  );
}
