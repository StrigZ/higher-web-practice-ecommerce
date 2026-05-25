import { CartItems } from '@/components/cart-page/cart-items';
import { CartSummary } from '@/components/cart-page/cart-summary';

export function CartPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Корзина</h2>
      <div className="flex justify-between gap-5">
        <CartItems />
        <CartSummary />
      </div>
    </div>
  );
}
