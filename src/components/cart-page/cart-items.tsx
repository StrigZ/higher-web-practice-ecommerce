import { CartItem } from './cart-item';

import { useGetCartQuery } from '@/api/cart-api';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';

export function CartItems() {
  const userId = useAppSelector(selectUserId);
  const { data: cartItems, isLoading } = useGetCartQuery(
    { userId: userId! },
    { skip: !userId },
  );

  if (isLoading || !cartItems) return null;

  return cartItems.length > 0 ? (
    <ul className="flex">
      {cartItems.map(({ productId, id }) => (
        <li key={id}>
          <CartItem id={id} productId={productId} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Ваша корзина пуста.</p>
  );
}
