import { ArrowLeft } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRegisterForm } from '@/hooks/use-register-form';

export function RegisterPage() {
  const { onSubmit, form } = useRegisterForm();

  return (
    <div className="flex h-full justify-center sm:items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <Link
            className="flex items-center gap-2 text-2xl font-bold hover:underline sm:hidden"
            to={'/'}
          >
            <ArrowLeft /> Регистрация
          </Link>
          <CardTitle className="hidden sm:block">
            <h2 className="text-2xl font-bold">Регистрация</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-end justify-stretch sm:block sm:flex-0">
          <form
            className="w-full"
            id="form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-first-name">Имя</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-login-first-name"
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
                    <FieldLabel htmlFor="form-login-last-name">
                      Фамилия
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-login-last-name"
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
                    <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-login-email"
                      placeholder="ivanov@yandex.ru"
                      type="email"
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
                    <FieldLabel htmlFor="form-login-password">
                      Придумайте пароль
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-login-password"
                      placeholder="********"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-confirm-password">
                      Повторите пароль
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-login-confirm-password"
                      placeholder="********"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-1 flex-col items-start gap-10 sm:flex-0">
          <Field orientation="vertical">
            <Button
              className="w-full text-base font-bold"
              form="form"
              type="submit"
            >
              Зарегистрироваться
            </Button>
            {form.formState.errors.root && (
              <FieldError errors={[form.formState.errors.root]} />
            )}
          </Field>
          <div className="mt-auto text-start">
            <p className="text-muted-foreground">Уже зарегистрированы?</p>
            <Link className="text-secondary font-bold" to={'/login'}>
              Войти в аккаунт
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
