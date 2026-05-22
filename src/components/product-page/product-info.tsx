import { useParams } from 'react-router-dom';

import { ShoppingCartButton } from '../cart-button';

import { useGetProductByIdQuery } from '@/api/products-api';
import { ProductHeader } from '@/components/product-page/product-header';
import { Separator } from '@/components/ui/separator';

export function ProductInfo() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductByIdQuery(
    { productId: id! },
    { skip: !id },
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductHeader />

      <div className="flex items-end justify-between">
        <ShoppingCartButton className="w-45" />
        <span className="text-muted-foreground text-base">
          {data.inStock ? 'Есть' : 'Нет'} в наличии
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-base font-bold">Описание</p>
        {data.description}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base font-bold">О товаре</p>
        <ul className="flex flex-col gap-2">
          {Object.entries(data.characteristics).map(([k, v]) => (
            <li className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground text-xs capitalize">
                  {k}
                </span>
                <span className="text-base">{v}</span>
              </div>
              <Separator className="bg-border" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
