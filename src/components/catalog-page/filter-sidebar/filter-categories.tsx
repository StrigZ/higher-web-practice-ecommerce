import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useGetProducts } from '@/hooks/use-get-products';
import { productCategories } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function FilterCategories({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const { isLoading, products } = useGetProducts();

  const subcategories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            ?.filter((p) => p.characteristics['категория'] === selectedCategory)
            .map(({ characteristics }) => characteristics['подкатегория']),
        ),
      ) ?? [],
    [products, selectedCategory],
  );

  if (isLoading) {
    // TODO: add skeleton
    return <div>loading</div>;
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-[12px] p-4 shadow-lg sm:rounded-none sm:p-0 sm:shadow-none',
        className,
      )}
    >
      {!!selectedCategory && (
        <Button
          className="text-secondary h-6 justify-start gap-0 p-0"
          variant={'link'}
          onClick={() =>
            setSearchParams((searchParams) => {
              searchParams.delete('page');

              searchParams.delete('category');
              searchParams.delete('subcategory');
              return searchParams;
            })
          }
        >
          Все категории
        </Button>
      )}
      <p className="text-base font-bold">{selectedCategory ?? 'Категории'}</p>
      <ul>
        {(selectedCategory ? subcategories : productCategories).map(
          (category) => (
            <li key={`filter-category-${category}`}>
              <Button
                className={cn('text-foreground w-full justify-start', {
                  'bg-muted text-secondary': searchParams.has(
                    'subcategory',
                    category,
                  ),
                })}
                variant={'link'}
                onClick={() =>
                  setSearchParams((searchParams) => {
                    searchParams.delete('page');

                    if (!selectedCategory) {
                      searchParams.delete('subcategory');
                    }
                    searchParams.set(
                      selectedCategory ? 'subcategory' : 'category',
                      category,
                    );
                    return searchParams;
                  })
                }
              >
                {category}
              </Button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
