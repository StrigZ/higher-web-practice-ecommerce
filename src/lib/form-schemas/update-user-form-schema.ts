import * as z from 'zod';

import { baseRegisterFormSchema } from './register-form-schema';

export const updateUserFormSchema = baseRegisterFormSchema
  .extend({
    password: baseRegisterFormSchema.shape.password.optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.password) return;

    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Поле не может быть пустым',
        path: ['confirmPassword'],
      });
    } else if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
      });
    }
  });

export type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>;
