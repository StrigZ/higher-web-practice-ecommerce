import { Controller, type Control } from 'react-hook-form';

import { Field, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

import { cities } from '@/lib/constants';
import type { CheckoutFormValues } from '@/lib/form-schemas/order-form-schema';

export function AddressInput({
  control,
}: {
  control: Control<CheckoutFormValues>;
}) {
  return (
    <FieldGroup className="gap-2">
      <FieldLabel className="text-foreground text-base">
        Доставить по адресу:
      </FieldLabel>
      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name="city"
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <Select
                aria-invalid={fieldState.invalid}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="bg-card ring-0">
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="bg-white"
                placeholder="улица, дом, квартира"
              />
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  );
}
