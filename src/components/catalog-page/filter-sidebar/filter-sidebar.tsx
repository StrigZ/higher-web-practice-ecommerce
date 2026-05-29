import { useSearchParams } from 'react-router-dom';

import { FilterCategories } from './filter-categories';
import { FilterGroups } from './filter-groups';
import { FilterPrice } from './filter-price';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function FilterSidebar({
  classNames,
  onClose,
}: {
  classNames?: string;
  onClose?: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Card className={cn('h-full p-0 md:h-fit', classNames)}>
      <CardContent className="flex flex-col gap-5 overflow-y-auto p-5 pt-0 md:p-6">
        <FilterCategories classNames="order-2 md:order-1" />
        <FilterGroups classNames="order-2 md:order-1" />
        <FilterPrice classNames="order-1 md:order-2" />

        <Button
          className="order-3 hidden md:flex"
          disabled={searchParams.size === 0}
          size={'lg'}
          variant={'outline'}
          onClick={() => setSearchParams({})}
        >
          Очистить фильтры
        </Button>
        {onClose && (
          <Button
            className="sticky bottom-0 order-3 w-full shadow-lg md:hidden"
            onClick={onClose}
          >
            Применить фильтры
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
