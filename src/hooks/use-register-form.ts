import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import {
  useLazyGetUserByEmailQuery,
  useRegisterUserMutation,
} from '@/api/users-api';
import { setUser } from '@/store/features/user/user-slice';
import { useAppDispatch } from '@/store/hooks';

const formSchema = z
  .object({
    firstName: z.string().nonempty('Поле не может быть пустым'),
    lastName: z.string().nonempty('Поле не может быть пустым'),
    email: z
      .string()
      .nonempty('Поле не может быть пустым')
      .email('Некорректный email'),
    password: z
      .string()
      .nonempty('Поле не может быть пустым')
      .min(6, { message: 'Пароль должен быть длиннее 6 символов.' })
      .max(20, { message: 'Пароль не может быть длиннее 20 символов.' })
      .refine((password) => /[A-Z]/.test(password), {
        message:
          'Пароль должен содержать хотя бы одну заглавную английскую букву.',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'Пароль должен содержать хотя бы одну английскую букву.',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'Пароль должен содержать хотя бы одну цифру.',
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message:
          'Пароль должен содержать хотя бы один специльный символ [!@#$%^&*].',
      }),
    confirmPassword: z.string().nonempty('Поле не может быть пустым'),
  })
  .refine((schema) => schema.confirmPassword === schema.password, {
    error: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  });

export function useRegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const [register] = useRegisterUserMutation();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, firstName, lastName, password } = data;

    const isEmailUnique = !(await getUserByEmail({ email })).data?.[0];
    if (!isEmailUnique) {
      form.setError('email', {
        message: 'Пользователь с таким email уже существует',
      });
      return;
    }

    const res = await register({
      email,
      firstName,
      lastName,
      password,
    });

    if (res.error) {
      form.setError('root', {
        message: 'Что-то пошло не так, попробуйте позже',
      });
      return;
    }

    dispatch(setUser({ userId: res.data.id }));
    navigate('/');
  }
  return { onSubmit, form };
}
