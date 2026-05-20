import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { useLazyLoginQuery } from '@/api/users-api';
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

export function useLoginForm() {
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

    if (res.error) {
      form.setError('root', {
        message: 'Что-то пошло не так, попробуйте позже',
      });
      return;
    }

    const user = res.data?.[0];
    if (user) {
      dispatch(setUser({ userId: user.id }));
      navigate('/');
    } else {
      form.setError('root', { message: 'Неверный email или пароль' });
    }
  }

  return { onSubmit, form };
}
