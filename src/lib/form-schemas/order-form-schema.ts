import * as z from 'zod';

import { deliveryMethods, paymentMethods } from '../constants';

export type CheckoutFormValues = z.infer<typeof formSchema>;

export const formSchema = z
  .object({
    paymentMethod: z.enum(paymentMethods),
    deliveryMethod: z.enum(deliveryMethods),
    city: z.string().nonoptional(),
    address: z.string().nonoptional(),
    pickupPoint: z.string().nonoptional(),
    phone: z.string().nonempty('Поле не может быть пустым'),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === 'courier' && !data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Введите адрес доставки',
        path: ['address'],
      });
    }
    if (data.deliveryMethod === 'pickup_point' && !data.pickupPoint) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Выберите пункт выдачи',
        path: ['pickupPoint'],
      });
    }
  });
