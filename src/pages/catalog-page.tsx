import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ActiveFiltersList } from '@/components/catalog-page/active-filters-list';
import { CatalogControls } from '@/components/catalog-page/catalog-controls';
import { FilterSidebar } from '@/components/catalog-page/filter-sidebar/filter-sidebar';
import { ProductList } from '@/components/catalog-page/product-list';
import { HeaderSearchbar } from '@/components/layout/main-layout/header/header-search';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';

export function CatalogPage() {
  const [searchParams] = useSearchParams();

  const [layoutStyle, setLayoutStyle] = useState<'сетка' | 'список'>('сетка');

  return (
    <div className="mx-auto flex h-full flex-col sm:max-w-295 sm:gap-5">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
        <HeaderSearchbar className="sm:hidden" />
        {searchParams.has('category') && (
          <Breadcrumbs
            values={[
              'УСЫ',
              searchParams.get('category'),
              searchParams.get('subcategory'),
            ]}
          />
        )}

        <div className="flex flex-1 gap-5 sm:py-8">
          <FilterSidebar classNames="hidden sm:flex sm:bg-white" />
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
      <MobileMenu />
    </div>
  );
}
