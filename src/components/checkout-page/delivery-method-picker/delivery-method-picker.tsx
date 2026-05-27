import { addDays, format } from 'date-fns';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Controller } from 'react-hook-form';

import { AddressInput } from './address-input';
import { PickupPointPicker } from './pickup-point-picker';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import type { DeliveryMethod } from '@/types';

const deliveryMethodData: { method: DeliveryMethod; label: string }[] = [
  {
    method: 'courier',
    label: 'Курьером',
  },
  {
    method: 'pickup_point',
    label: 'В пункт выдачи',
  },
];

const sevenDaysFromNow = addDays(new Date(), 7);
const formattedDate = format(sevenDaysFromNow, 'yyyy-MM-dd', { locale: ru });

export function DeliveryMethodPicker({
  control,
  active,
}: {
  control;
  active: DeliveryMethod;
}) {
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col gap-5 px-4 py-5">
        <Controller
          control={control}
          name="deliveryMethod"
          render={({ field, fieldState }) => (
            <Field className="gap-4" data-invalid={fieldState.invalid}>
              <p className="text-xl font-bold">Способ доставки</p>
              <div className="flex gap-2">
                {deliveryMethodData.map(({ label, method }) => (
                  <Button
                    key={method}
                    className={cn(
                      'text-foreground border-muted-foreground flex-1 bg-white',
                      {
                        'border-secondary text-secondary bg-muted':
                          active === method,
                      },
                    )}
                    type="button"
                    variant={'outline'}
                    onClick={() => field.onChange(method)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {active === 'courier' ? (
          <AddressInput control={control} />
        ) : (
          <PickupPointPicker control={control} />
        )}
        <p className="text-muted-foreground flex items-center gap-2">
          Доставят
          <span className="text-foreground text-base">{formattedDate}</span>
        </p>
      </CardContent>
    </Card>
  );
}
