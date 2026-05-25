import { useMemo } from 'react';

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

  const totalPrice = useMemo(
    () => (cartItems ?? []).reduce((prev, curr) => prev + curr.price, 0),
    [cartItems],
  );

  if (isLoading || !cartItems) {
    // TODO:add spinner
    return <p>loading</p>;
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-4">
      <h2 className="text-2xl font-bold">Корзина</h2>
      <div className="flex justify-between gap-5 overflow-hidden">
        <CartItems items={cartItems} />
        {cartItems.length > 0 && (
          <CartSummary quantity={cartItems.length} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
}
