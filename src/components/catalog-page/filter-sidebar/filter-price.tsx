import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/use-products';

export function FilterPrice() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { products } = useProducts();
  const { maxPrice, minPrice } = useMemo(
    () => ({
      minPrice:
        products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0,
      maxPrice:
        products.length > 0 ? Math.max(...products.map((p) => p.price)) : 0,
    }),
    [products],
  );

  const updateSearchParams = (type: 'minPrice' | 'maxPrice', value: string) =>
    setSearchParams((searchParams) => {
      if (value) {
        searchParams.set(type, value);
      } else {
        searchParams.delete(type);
      }

      return searchParams;
    });

  return (
    <FieldGroup className="flex flex-col gap-y-3">
      <p className="text-base font-bold">Цена</p>
      <Field className="gap-x-2" orientation="horizontal">
        <Input
          className="bg-muted border-disabled border"
          min={minPrice}
          placeholder={String(minPrice)}
          type="number"
          value={searchParams.get('minPrice') ?? ''}
          onChange={({ target: { value } }) => {
            updateSearchParams('minPrice', value);
          }}
        />
        <Input
          className="bg-muted border-disabled border"
          max={maxPrice}
          placeholder={String(maxPrice)}
          type="number"
          value={searchParams.get('maxPrice') ?? ''}
          onChange={({ target: { value } }) => {
            updateSearchParams('maxPrice', value);
          }}
        />
      </Field>
    </FieldGroup>
  );
}
