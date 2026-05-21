import { useSearchParams } from 'react-router-dom';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
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
    <div className="space-y-3">
      <p className="text-base font-bold">{label}</p>
      {type === 'radio' ? (
        <RadioGroup
          className="gap-y-3"
          value={searchParams.get(filterName)}
          onValueChange={updateSearchParams}
        >
          {values.map((value) => (
            <div key={value} className="flex items-center gap-x-2">
              <RadioGroupItem
                id={`filter-${filterName}-${value}`}
                value={value}
              />
              <Label
                className="text-sm"
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
            <Field key={value} className="gap-x-2" orientation="horizontal">
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
                  id={`filter-${filterName}-${value}`}
                  name={`filter-${filterName}-${value}`}
                  onCheckedChange={() => updateSearchParams(value)}
                />
              )}
              <FieldLabel
                className="text-sm"
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
