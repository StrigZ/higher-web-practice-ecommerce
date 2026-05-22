import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '@/api/products-api';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductImageCarousel } from '@/components/product-page/product-card/product-image-carousel';
import { ProductInfo } from '@/components/product-page/product-card/product-info';
import { Card } from '@/components/ui/card';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery(
    { productId: id! },
    { skip: !id },
  );

  //   TODO:replace with spinner or skeleton
  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto grid max-w-245 grid-rows-[auto_1fr_auto] gap-5 py-8">
      <Breadcrumbs
        values={[
          'УСЫ',
          data.characteristics['категория'],
          data.characteristics['подкатегория'],
        ]}
      />
      <Card className="grid grid-cols-2 gap-5 p-6">
        <ProductImageCarousel />
        <ProductInfo />
      </Card>
      <div>rating</div>
    </div>
  );
}
