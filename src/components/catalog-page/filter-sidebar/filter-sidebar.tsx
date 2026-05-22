import { useSearchParams } from 'react-router-dom';

import { FilterCategories } from './filter-categories';
import { FilterGroups } from './filter-groups';
import { FilterPrice } from './filter-price';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <FilterCategories />
        <FilterGroups />
        <FilterPrice />

        <Button
          disabled={searchParams.size === 0}
          size={'lg'}
          variant={'outline'}
          onClick={() => setSearchParams({})}
        >
          Очистить фильтры
        </Button>
      </CardContent>
    </Card>
  );
}
