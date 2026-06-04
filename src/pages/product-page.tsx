import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShoppingCartButton } from '@/components/cart-button';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
import { ProductImageCarousel } from '@/components/product-page/product-card/product-image-carousel';
import { ProductInfo } from '@/components/product-page/product-card/product-info';
import { ProductRatingCard } from '@/components/product-page/product-rating-card/product-rating-card';
import { Card } from '@/components/ui/card';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductPage() {
  const { product } = useProductPageContext();
  const { user } = useGetCurrentUser();

  return (
    <div className="flex h-full flex-col">
      <div className="container mx-auto overflow-y-scroll sm:py-8">
        <div className="flex flex-col gap-5">
          <Breadcrumbs
            className="hidden sm:block"
            values={[
              'УСЫ',
              product.characteristics['категория'],
              product.characteristics['подкатегория'],
            ]}
          />

          <Card className="bg-background sm:bg-card flex flex-col p-0 shadow-none sm:grid sm:grid-cols-2 sm:gap-5 sm:p-6 sm:shadow-xs">
            <ProductImageCarousel />
            <ProductInfo className="px-5" />
          </Card>
          <div className="px-5 sm:px-0">
            <ProductRatingCard />
          </div>
          {user && (
            <div className="sticky bottom-0 grid border-t bg-white px-5 py-4 sm:hidden">
              <ShoppingCartButton product={product} />
            </div>
          )}
        </div>
      </div>
      <MobileMenu />
    </div>
  );
}
