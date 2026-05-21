import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/catalog-page/breadcrumbs';
import { CatalogControls } from '@/components/catalog-page/catalog-controls';
import { FilterSidebar } from '@/components/catalog-page/filter-sidebar/filter-sidebar';
import { ProductList } from '@/components/catalog-page/product-list';

export function CatalogPage() {
  const [searchParams] = useSearchParams();

  const [layoutStyle, setLayoutStyle] = useState<'сетка' | 'список'>('сетка');

  return (
    <div className="flex flex-col gap-5 py-8">
      {searchParams.has('category') && <Breadcrumbs />}
      <div className="flex gap-5">
        <FilterSidebar />
        <div className="flex flex-1 flex-col gap-2">
          <header className="flex justify-between">
            <h1 className="text-3xl font-bold uppercase">Усы</h1>
            <CatalogControls
              layoutStyle={layoutStyle}
              updateLayoutStyle={(style) => setLayoutStyle(style)}
            />
          </header>
          <ProductList layoutStyle={layoutStyle} />
        </div>
      </div>
    </div>
  );
}
