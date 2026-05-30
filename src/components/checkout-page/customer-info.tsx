import { Controller, type Control } from 'react-hook-form';

import { Card, CardContent } from '../ui/card';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import type { CheckoutFormValues } from '@/lib/form-schemas/order-form-schema';

export function CustomerInfo({
  control,
}: {
  control: Control<CheckoutFormValues>;
}) {
  const { user } = useGetCurrentUser();
  return (
    <Card className="p-0">
      <CardContent className="flex grid-rows-2 flex-col gap-4 px-4 py-5">
        <p className="col-span-full text-xl font-bold">Получатель</p>

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <p className="text-base">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field
                className="gap-0.5 sm:w-54"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Номер телефона</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="+7"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-2 gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Комментарии к заказу</FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
}
