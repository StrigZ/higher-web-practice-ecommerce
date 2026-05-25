import { CartItem } from './cart-item';

import type { CartItem as TCartItem } from '@/types';

export function CartItems({ items }: { items: TCartItem[] }) {
  return items.length > 0 ? (
    <ul className="flex">
      {items.map(({ productId, id }) => (
        <li key={id}>
          <CartItem id={id} productId={productId} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Ваша корзина пуста.</p>
  );
}
