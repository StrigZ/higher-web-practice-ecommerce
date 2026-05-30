import { CartItems } from '@/components/cart-page/cart-items';
import { CartSummary } from '@/components/cart-page/cart-summary';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
import { useGetCurrentUserCart } from '@/hooks/use-get-current-user-cart';

export function CartPage() {
  const { isLoading, quantity, totalPrice, cartItems } =
    useGetCurrentUserCart();

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden">
        <div className="flex h-full flex-col justify-between gap-0 overflow-y-auto sm:flex-row sm:gap-5 sm:overflow-hidden">
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5 sm:p-0">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <p className="text-muted-foreground">{quantity} товара</p>
            </div>
            <CartItems items={cartItems} />
          </div>
          {cartItems.length > 0 && (
            <CartSummary
              className="sticky bottom-0 w-full"
              quantity={quantity}
              totalPrice={totalPrice}
            />
          )}
        </div>
      </div>

      <MobileMenu />
    </div>
  );
}
