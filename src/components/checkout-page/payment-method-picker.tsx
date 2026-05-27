import { Controller } from 'react-hook-form';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

import { Field, FieldError } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import type { PaymentMethod } from '@/types';

const paymentMethodData: { method: PaymentMethod; label: string }[] = [
  {
    method: 'card_online',
    label: 'Картой онлайн',
  },
  {
    method: 'card_on_delivery',
    label: 'Картой при получении',
  },
  {
    method: 'cash',
    label: 'Наличными при получении',
  },
];

export function PaymentMethodPicker({
  control,
  active,
}: {
  control;
  active: PaymentMethod;
}) {
  return (
    <Card className="p-0">
      <CardContent className="px-4 py-5">
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field, fieldState }) => (
            <Field className="gap-4" data-invalid={fieldState.invalid}>
              <p className="text-xl font-bold">Способ оплаты</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethodData.map(({ label, method }) => (
                  <Button
                    key={method}
                    className={cn(
                      'text-foreground border-muted-foreground bg-white',
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
      </CardContent>
    </Card>
  );
}
