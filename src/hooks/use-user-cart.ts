import { useMemo } from 'react';

import { useGetCartQuery } from '@/api/cart-api';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function useUserCart() {
  const userId = useAppSelector(selectUserId);
  const { data: cartItems, isLoading } = useGetCartQuery(
    { userId: userId! },
    { skip: !userId },
  );

  const totalPrice = useMemo(
    () => (cartItems ?? []).reduce((prev, curr) => prev + curr.price, 0),
    [cartItems],
  );

  return {
    quantity: cartItems ? cartItems.length : 0,
    totalPrice,
    cartItems: cartItems ?? [],
    isLoading,
  };
}
