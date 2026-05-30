import { useSearchParams } from 'react-router-dom';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { ProductFilterGroup } from '@/types/product';

type Props = {
  label: string;
  type: 'radio' | 'checkbox' | 'switch';
  filterName: string;
  values: ProductFilterGroup;
};

export function FilterGroup({ values, type, filterName, label }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (value: string) =>
    setSearchParams((searchParams) => {
      searchParams.delete('page');

      switch (type) {
        case 'checkbox': {
          const current =
            searchParams.get(filterName)?.split(',').filter(Boolean) ?? [];
          const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

          if (updated.length === 0) {
            searchParams.delete(filterName);
          } else {
            searchParams.set(filterName, updated.join(','));
          }
          break;
        }
        case 'radio': {
          searchParams.set(filterName, value);
          break;
        }
        case 'switch': {
          if (searchParams.has(filterName)) {
            searchParams.delete(filterName);
          } else {
            searchParams.set(filterName, value);
          }
          break;
        }
      }

      return searchParams;
    });

  return (
    <div className="space-y-3 rounded-[12px] p-4 shadow-lg sm:rounded-none sm:p-0 sm:shadow-none">
      <p
        className={cn('text-base font-bold', {
          'hidden sm:inline-flex': type === 'switch',
        })}
      >
        {label}
      </p>
      {type === 'radio' ? (
        <RadioGroup
          className="gap-y-3"
          value={searchParams.get(filterName)}
          onValueChange={updateSearchParams}
        >
          {values.map((value) => (
            <div
              key={value}
              className="bg-background has-[data-state='checked']:border-secondary flex items-center gap-x-2 rounded-[4px] px-3 py-1 has-[data-state='checked']:border sm:bg-white sm:p-0"
            >
              <RadioGroupItem
                id={`filter-${filterName}-${value}`}
                value={value}
              />
              <Label
                className="flex-1 text-sm"
                htmlFor={`filter-${filterName}-${value}`}
              >
                {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <FieldGroup className="flex flex-col gap-y-3">
          {values.map((value) => (
            <Field
              key={value}
              className="flex gap-x-2"
              orientation="horizontal"
            >
              {type === 'checkbox' ? (
                <Checkbox
                  checked={
                    searchParams.get(filterName)?.split(',').includes(value) ??
                    false
                  }
                  id={`filter-${filterName}-${value}`}
                  name={`filter-${filterName}-${value}`}
                  onCheckedChange={() => updateSearchParams(value)}
                />
              ) : (
                <Switch
                  checked={searchParams.has(filterName)}
                  className="order-2 sm:order-1"
                  id={`filter-${filterName}-${value}`}
                  name={`filter-${filterName}-${value}`}
                  onCheckedChange={() => updateSearchParams(value)}
                />
              )}
              <FieldLabel
                className="order-1 text-sm sm:order-2"
                htmlFor={`filter-${filterName}-${value}`}
              >
                {value}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      )}
    </div>
  );
}
