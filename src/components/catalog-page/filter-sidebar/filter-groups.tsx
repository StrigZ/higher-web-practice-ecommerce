import { FilterGroup } from './filter-group';

import {
  productCurliness,
  productStyles,
  productThickness,
} from '@/lib/constants';
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

export function FilterGroups() {
  return filterData.map((data) => (
    <FilterGroup {...data} key={data.filterName} />
  ));
}
