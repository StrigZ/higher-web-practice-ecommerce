import * as z from 'zod';

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export const passwordFieldSchema = z
  .string()
  .nonempty('Поле не может быть пустым')
  .min(6, { message: 'Пароль должен быть длиннее 6 символов.' })
  .max(20, { message: 'Пароль не может быть длиннее 20 символов.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Пароль должен содержать хотя бы одну заглавную английскую букву.',
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
  });

export const baseRegisterFormSchema = z.object({
  firstName: z.string().nonempty('Поле не может быть пустым'),
  lastName: z.string().nonempty('Поле не может быть пустым'),
  email: z
    .string()
    .nonempty('Поле не может быть пустым')
    .email('Некорректный email'),
  password: passwordFieldSchema,
  confirmPassword: z.string().nonempty('Поле не может быть пустым'),
});

export const registerFormSchema = baseRegisterFormSchema.refine(
  (schema) => schema.confirmPassword === schema.password,
  {
    error: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  },
);
