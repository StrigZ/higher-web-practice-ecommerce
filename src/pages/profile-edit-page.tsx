import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { useUpdateUserMutation } from '@/api/users-api';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';

const formSchema = z.object({
  firstName: z.string().nonempty('Поле не может быть пустым'),
  lastName: z.string().nonempty('Поле не может быть пустым'),
  email: z.email().nonempty('Поле не может быть пустым'),
});

export function ProfileEditPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { user } = useGetCurrentUser();

  useEffect(() => {
    if (!user) return;

    form.setValues(user);
  }, [form, user]);

  const [updateUser] = useUpdateUserMutation();

  if (!user) {
    return <p>loading...</p>;
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { data: newUser } = await updateUser({ data, userId: user.id });

    if (newUser) {
      navigate('/profile');
    }
  };

  return (
    <Card className="flex-1 p-0">
      <CardContent className="px-4 py-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="grid grid-cols-2 grid-rows-2 gap-4">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-first-name">Имя</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="edit-first-name"
                    placeholder="Ярополк"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-last-name">Фамилия</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="edit-last-name"
                    placeholder="Иванов"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-email">Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="edit-email"
                    placeholder="ivan@example.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex gap-2">
            <Link
              className={buttonVariants({
                variant: 'outline',
                className: 'text-base! font-bold!',
              })}
              to={'/profile'}
            >
              Отменить
            </Link>
            <Button className="text-base font-bold" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
