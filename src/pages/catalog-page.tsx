import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ActiveFiltersList } from '@/components/catalog-page/active-filters-list';
import { CatalogControls } from '@/components/catalog-page/catalog-controls';
import { FilterSidebar } from '@/components/catalog-page/filter-sidebar/filter-sidebar';
import { ProductList } from '@/components/catalog-page/product-list';

export function CatalogPage() {
  const [searchParams] = useSearchParams();

  const [layoutStyle, setLayoutStyle] = useState<'сетка' | 'список'>('сетка');

  return (
    <div className="mx-auto flex max-w-295 flex-col gap-3 p-5 pt-3 md:gap-x-5 md:py-8">
      {searchParams.has('category') && (
        <Breadcrumbs
          values={[
            'УСЫ',
            searchParams.get('category'),
            searchParams.get('subcategory'),
          ]}
        />
      )}
      <div className="flex gap-5">
        <FilterSidebar classNames="hidden md:flex md:bg-white" />
        <div className="flex flex-1 flex-col gap-2">
          <header className="flex justify-between">
            <h1 className="text-3xl font-bold uppercase">Усы</h1>
            <CatalogControls
              layoutStyle={layoutStyle}
              updateLayoutStyle={(style) => setLayoutStyle(style)}
            />
          </header>
          <ActiveFiltersList />
          <ProductList layoutStyle={layoutStyle} />
        </div>
      </div>
    </div>
  );
}
