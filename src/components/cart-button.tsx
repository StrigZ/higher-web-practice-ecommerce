import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from './ui/button';

import {
  useAddItemMutation,
  useGetCartQuery,
  useRemoveItemMutation,
  useUpdateItemQuantityMutation,
} from '@/api/cart-api';
import { cn } from '@/lib/utils';
import { selectUserId } from '@/store/features/user/user-slice';
import { useAppSelector } from '@/store/hooks';
import type { Product } from '@/types';

export function ShoppingCartButton({
  className,
  product,
  quantity = 1,
}: {
  className?: string;
  product: Product;
  quantity?: number;
}) {
  const userId = useAppSelector(selectUserId);

  const [addItem] = useAddItemMutation();
  const [updateItemQuantity] = useUpdateItemQuantityMutation();
  const [removeItem] = useRemoveItemMutation();

  const { data: cartItems } = useGetCartQuery(
    { userId: userId! },
    { skip: !userId },
  );

  const cartItem = useMemo(
    () => cartItems?.find(({ productId: targetId }) => targetId === product.id),
    [cartItems, product.id],
  );

  const handleAddItem = () => {
    if (!userId) return;

    if (cartItem) {
      updateItemQuantity({
        id: cartItem.id,
        quantity: cartItem.quantity + 1,
      });
    } else {
      addItem({
        quantity,
        price: product.price,
        productId: product.id,
      });
    }
  };

  const handleDecrementItem = () => {
    if (!userId || !cartItem) return;

    if (cartItem.quantity > 1) {
      updateItemQuantity({
        id: cartItem.id,
        quantity: cartItem.quantity - 1,
      });
    } else {
      removeItem({
        id: cartItem.id,
      });
    }
  };

  if (!userId) return null;

  return cartItem ? (
    <div className="flex w-full flex-1 items-center gap-2">
      <Button className="flex-1" onClick={handleDecrementItem}>
        <Minus />
      </Button>
      <span>{cartItem.quantity}</span>
      <Button className="flex-1" onClick={handleAddItem}>
        <Plus />
      </Button>
    </div>
  ) : (
    <Button className={cn('h-10 p-2', className)} onClick={handleAddItem}>
      <ShoppingCart className="size-6" />
    </Button>
  );
}
