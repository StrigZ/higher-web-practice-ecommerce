import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useUpdateUserMutation } from '@/api/users-api';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
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
import {
  updateUserFormSchema,
  type UpdateUserFormValues,
} from '@/lib/form-schemas/update-user-form-schema';

export function ProfileEditPage() {
  const navigate = useNavigate();
  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserFormSchema),
  });
  const password = useWatch({ control: form.control, name: 'password' });

  const { user } = useGetCurrentUser();

  useEffect(() => {
    if (!user) return;
    const { password, ...rest } = user;
    void password;

    form.reset(rest);
  }, [form, user]);

  useEffect(() => {
    if (!password) form.resetField('confirmPassword');
  }, [password, form]);

  const [updateUser] = useUpdateUserMutation();

  if (!user) {
    return <p>loading...</p>;
  }

  const onSubmit = async (data: UpdateUserFormValues) => {
    const { data: newUser } = await updateUser({ data, userId: user.id });

    if (newUser) {
      navigate('/profile');
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2 p-5 sm:gap-0 sm:p-0">
        <h1 className="text-2xl font-bold sm:hidden">Мой профиль</h1>
        <Card className="p-0">
          <CardContent className="px-4 py-6">
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup className="grid grid-rows-3 gap-4 sm:grid-cols-2 sm:grid-rows-2">
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
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="edit-new-password">
                        Новый пароль
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        id="edit-new-password"
                        placeholder="******"
                        type="password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {password && (
                  <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="edit-confirm-new-password">
                          Повторите новый пароль
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          id="edit-confirm-new-password"
                          placeholder="******"
                          type="password"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </FieldGroup>
              <div className="flex flex-col gap-2 sm:flex-row">
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
      </div>
      <MobileMenu />
    </div>
  );
}
