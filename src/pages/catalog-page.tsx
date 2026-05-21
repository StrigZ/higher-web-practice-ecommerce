import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/catalog-page/breadcrumbs';
import { FilterSidebar } from '@/components/catalog-page/filter-sidebar/filter-sidebar';
import { useProducts } from '@/hooks/use-products';

export function CatalogPage() {
  const { isLoading, products } = useProducts();
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col gap-5 py-8">
      {searchParams.has('category') && <Breadcrumbs />}
      <div className="flex gap-5">
        <FilterSidebar />
        <div className="flex flex-1 flex-col gap-2">
          <header className="flex justify-between">
            <h1 className="text-3xl font-bold uppercase">Усы</h1>
            <div>сортировка</div>
          </header>
          {isLoading ? (
            <div>loading</div>
          ) : (
            <ul>
              {products.map((product) => (
                <li>
                  {product.name}
                  <ul>
                    {Object.entries(product.characteristics).map(([k, v]) => (
                      <li>
                        `${k}:${v}`
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
