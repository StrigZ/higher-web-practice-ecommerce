import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '../ui/button';

import { Badge } from '@/components/ui/badge';
import type { Filters } from '@/types/product';

type VisibleFilter = keyof Omit<
  Filters,
  'page' | 'sortBy' | 'minPrice' | 'maxPrice' | 'searchTerm'
>;

const searchParamsToLabelMap: Record<VisibleFilter, string> = {
  category: 'Категория:',
  curliness: 'Закрученность:',
  inStock: '',
  style: 'Стиль:',
  thickness: 'Густота:',
  subcategory: 'Подкатегория:',
};
export function ActiveFiltersList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilters = Array.from(searchParams.entries())
    .filter(
      ([k]) =>
        !['page', 'sortBy', 'minPrice', 'maxPrice', 'searchTerm'].includes(k),
    )
    .flatMap(([k, v]) =>
      v.includes(',')
        ? v.split(',').map((val) => [k, val] as [string, string])
        : [[k, v] as [string, string]],
    );

  const removeFilter = (filter: string, value: string) =>
    setSearchParams((searchParams) => {
      const current =
        searchParams.get(filter)?.split(',').filter(Boolean) ?? [];
      const updated = current.filter((val) => val !== value);
      if (updated.length === 0) {
        searchParams.delete(filter);
      } else {
        searchParams.set(filter, updated.join(','));
      }
      return searchParams;
    });

  if (activeFilters.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {activeFilters.map(([k, v]) => (
        <li key={k}>
          <Badge
            className="text-primary border-primary h-7 gap-3 rounded-[20px] px-3 py-0.5 text-xs font-normal"
            variant={'outline'}
          >
            {`${searchParamsToLabelMap[k as VisibleFilter]} ${v}`}
            <Button
              className="h-auto"
              size={'icon'}
              variant={'link'}
              onClick={() => removeFilter(k, v)}
            >
              <X className="size-5" />
            </Button>
          </Badge>
        </li>
      ))}
    </ul>
  );
}
