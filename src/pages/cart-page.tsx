import { useGetCartQuery } from '@/api/cart-api';
import { CartItems } from '@/components/cart-page/cart-items';
import { CartSummary } from '@/components/cart-page/cart-summary';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function CartPage() {
  const userId = useAppSelector(selectUserId);
  const { data: cartItems, isLoading } = useGetCartQuery(
    { userId: userId! },
    { skip: !userId },
  );
  if (isLoading || !cartItems) {
    // TODO:add spinner
    return <p>loading</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Корзина</h2>
      <div className="flex justify-between gap-5">
        <CartItems items={cartItems} />
        {cartItems.length > 0 && <CartSummary />}
      </div>
    </div>
  );
}
