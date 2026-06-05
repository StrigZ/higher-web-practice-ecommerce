import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  useLazyGetUserByEmailQuery,
  useRegisterUserMutation,
} from '@/api/users-api';
import {
  registerFormSchema,
  type RegisterFormValues,
} from '@/lib/form-schemas/register-form-schema';
import { setUser } from '@/store/features/user/user-slice';
import { useAppDispatch } from '@/store/hooks';

export function useRegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
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

  async function onSubmit(data: RegisterFormValues) {
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
