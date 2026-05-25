import { CartItems } from '@/components/cart-page/cart-items';
import { CartSummary } from '@/components/cart-page/cart-summary';
import { useGetCurrentUserCart } from '@/hooks/use-get-current-user-cart';

export function CartPage() {
  const { isLoading, quantity, totalPrice, cartItems } =
    useGetCurrentUserCart();

  if (isLoading) {
    // TODO:add spinner
    return <p>loading</p>;
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-4">
      <h2 className="text-2xl font-bold">Корзина</h2>
      <div className="flex justify-between gap-5 overflow-hidden">
        <CartItems items={cartItems} />
        {cartItems.length > 0 && (
          <CartSummary quantity={quantity} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
}
