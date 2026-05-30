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
import { cn } from '@/lib/utils';

export function AddressInput({
  control,
  className,
}: {
  control: Control<CheckoutFormValues>;
  className?: string;
}) {
  return (
    <FieldGroup className={cn('gap-2', className)}>
      <FieldLabel className="text-foreground text-base">
        Доставить по адресу:
      </FieldLabel>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
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
