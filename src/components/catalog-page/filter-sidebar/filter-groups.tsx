import { FilterGroup } from './filter-group';

import {
  productCurliness,
  productStyles,
  productThickness,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ProductFilterGroup } from '@/types/product';

const filterData: {
  label: string;
  filterName: string;
  values: ProductFilterGroup;
  type: 'checkbox' | 'radio' | 'switch';
}[] = [
  {
    label: 'Стиль',
    filterName: 'style',
    values: productStyles,
    type: 'checkbox',
  },
  {
    label: 'Густота',
    filterName: 'thickness',
    values: productThickness,
    type: 'radio',
  },
  {
    label: 'Закрученность',
    filterName: 'curliness',
    values: productCurliness,
    type: 'radio',
  },
  {
    label: 'Фильтр',
    filterName: 'inStock',
    values: ['В наличии'],
    type: 'switch',
  },
];

export function FilterGroups({ classNames }: { classNames?: string }) {
  return (
    <div className={cn('flex flex-col gap-5', classNames)}>
      {filterData.map((data) => (
        <FilterGroup {...data} key={data.filterName} />
      ))}
    </div>
  );
}
