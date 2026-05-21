import { useSearchParams } from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productSortingVariants } from '@/lib/constants';
import type { ProductSort } from '@/types';

const sortingVariantToLabelMap: Record<ProductSort, string> = {
  newest: 'Сначала новые',
  price_asc: 'Сначала дешевые',
  price_desc: 'Сначала дорогие',
  rating: 'Сначала популярные',
};

type Props = {
  layoutStyle: 'сетка' | 'список';
  updateLayoutStyle: (style: 'сетка' | 'список') => void;
};
export function CatalogControls({ layoutStyle, updateLayoutStyle }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={searchParams.get('sortBy') ?? 'newest'}
        onValueChange={(value) =>
          setSearchParams((searchParams) => {
            searchParams.set('sortBy', value);
            return searchParams;
          })
        }
      >
        <SelectTrigger className="bg-card ring-0">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {productSortingVariants.map((variant) => (
              <SelectItem value={variant}>
                {sortingVariantToLabelMap[variant]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={layoutStyle} onValueChange={updateLayoutStyle}>
        <SelectTrigger className="bg-card ring-0">
          <SelectValue placeholder="Отображение" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="сетка">Сеткой</SelectItem>
            <SelectItem value="список">Списком</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
