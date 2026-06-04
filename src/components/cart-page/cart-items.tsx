import { Separator } from '../ui/separator';

import { CartItem } from './cart-item';

import type { CartItem as TCartItem } from '@/types';

export function CartItems({ items }: { items: TCartItem[] }) {
  return items.length > 0 ? (
    <ul className="flex flex-1 flex-col gap-4 overflow-y-auto">
      {items.map(({ productId, id }) => (
        <li key={id}>
          <CartItem id={id} productId={productId} />
          <Separator className="my-2 sm:hidden" />
        </li>
      ))}
    </ul>
  ) : (
    <p>Ваша корзина пуста.</p>
  );
}
