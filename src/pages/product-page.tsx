import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductImageCarousel } from '@/components/product-page/product-card/product-image-carousel';
import { ProductInfo } from '@/components/product-page/product-card/product-info';
import { ProductRatingCard } from '@/components/product-page/product-rating-card/product-rating-card';
import { Card } from '@/components/ui/card';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductPage() {
  const { product } = useProductPageContext();

  return (
    <div className="mx-auto grid max-w-245 grid-rows-[auto_1fr_auto] gap-5 py-8">
      <Breadcrumbs
        values={[
          'УСЫ',
          product.characteristics['категория'],
          product.characteristics['подкатегория'],
        ]}
      />
      <Card className="grid grid-cols-2 gap-5 p-6">
        <ProductImageCarousel />
        <ProductInfo />
      </Card>
      <ProductRatingCard />
    </div>
  );
}
