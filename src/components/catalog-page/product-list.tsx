import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductCard } from './product-card';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useProducts } from '@/hooks/use-products';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 12;
export function ProductList({
  layoutStyle,
}: {
  layoutStyle: 'сетка' | 'список';
}) {
  const { isLoading, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);

  const paginated = useMemo(
    () => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [products, page],
  );

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <ul
        className={cn('grid rounded-[12px] p-5', {
          'bg-card grid-cols-4 grid-rows-3 gap-5': layoutStyle === 'сетка',
          'grid-cols-1 gap-2': layoutStyle === 'список',
        })}
      >
        {paginated.map((product) => (
          <li key={product.id}>
            <ProductCard {...product} layoutStyle={layoutStyle} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text=""
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set('page', String(Math.max(1, page - 1)));
                    return prev;
                  })
                }
              />
            </PaginationItem>
            {pages.map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  isActive={page === n}
                  onClick={() =>
                    setSearchParams((prev) => {
                      prev.set('page', String(n));
                      return prev;
                    })
                  }
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                text=""
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set('page', String(Math.min(totalPages, page + 1)));
                    return prev;
                  })
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
