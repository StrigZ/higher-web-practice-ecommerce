import { ShoppingCartButton } from '../../cart-button';

import { ProductHeader } from './product-header';

import { Separator } from '@/components/ui/separator';
import { useProductPageContext } from '@/providers/product-page-context/use-product-page-context';

export function ProductInfo() {
  const { product } = useProductPageContext();

  return (
    <div className="flex flex-col gap-4">
      <ProductHeader />

      <div className="flex items-end justify-between">
        <ShoppingCartButton className="w-45" product={product} />
        <span className="text-muted-foreground text-base">
          {product.inStock ? 'Есть' : 'Нет'} в наличии
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-base font-bold">Описание</p>
        {product.description}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base font-bold">О товаре</p>
        <ul className="flex flex-col gap-2">
          {Object.entries(product.characteristics).map(([k, v]) => (
            <li key={k} className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-muted-foreground text-xs capitalize">
                  {k}
                </span>
                <span className="text-base">{v}</span>
              </div>
              <Separator />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
