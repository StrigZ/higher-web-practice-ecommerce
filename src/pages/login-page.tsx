import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { useLazyLoginQuery } from '@/api/users-api';
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
import { setUser } from '@/store/features/user/user-slice';
import { useAppDispatch } from '@/store/hooks';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Поле не может быть пустым')
    .email('Некорректный email')
    .trim(),
  password: z.string().min(1, 'Поле не может быть пустым').trim(),
});

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLazyLoginQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data;
    const res = await login({ email, password });

    if (res.data?.[0]) {
      dispatch(setUser({ userId: res.data?.[0].id }));
      navigate('/');
      console.log('LOGIN');
    } else {
      form.setError('root', { message: 'Неверный email или пароль' });
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">Вход в аккаунт</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-muted-foreground"
                      htmlFor="form-login"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-login"
                      placeholder="ivanov@yandex.ru"
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
                    <FieldLabel
                      className="text-muted-foreground"
                      htmlFor="form-password"
                    >
                      Пароль
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="form-password"
                      placeholder="********"
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
        <CardFooter className="flex flex-col items-start gap-10">
          <Field orientation="vertical">
            <Button
              className="w-full text-base font-bold"
              form="form"
              type="submit"
            >
              Войти
            </Button>
            {form.formState.errors.root && (
              <FieldError errors={[form.formState.errors.root]} />
            )}
          </Field>
          <div className="text-start">
            <p className="text-muted-foreground">У вас еще нет аккаунта?</p>
            <Link className="text-secondary font-bold" to={'/register'}>
              Зарегистрироваться
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
