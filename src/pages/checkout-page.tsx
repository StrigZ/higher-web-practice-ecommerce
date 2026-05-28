import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useCreateOrderMutation } from '@/api/orders-api';
import { CustomerInfo } from '@/components/checkout-page/customer-info';
import { DeliveryMethodPicker } from '@/components/checkout-page/delivery-method-picker/delivery-method-picker';
import { OrderSummary } from '@/components/checkout-page/order-summary';
import { PaymentMethodPicker } from '@/components/checkout-page/payment-method-picker';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { useGetCurrentUserCart } from '@/hooks/use-get-current-user-cart';
import { cities, pickupPoints } from '@/lib/constants';
import {
  formSchema,
  type CheckoutFormValues,
} from '@/lib/form-schemas/order-form-schema';

export function CheckoutPage() {
  const { user } = useGetCurrentUser();
  const { cartItems, totalPrice } = useGetCurrentUserCart();

  const [createOrder] = useCreateOrderMutation();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'card_online',
      deliveryMethod: 'courier',
      phone: user?.phone ?? '',
      comment: '',
      pickupPoint: pickupPoints[0].id,
      address: '',
      city: cities[0],
    },
  });
  const paymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod',
  });
  const deliveryMethod = useWatch({
    control: form.control,
    name: 'deliveryMethod',
  });

  useEffect(() => {
    if (!user) return;
    form.setValue('phone', user.phone ?? '');
  }, [form, user]);

  function onSubmit(data: CheckoutFormValues) {
    if (!user) return;

    createOrder({
      userId: user.id,
      createdAt: new Date().toISOString(),
      items: cartItems,
      totalPrice,
      status: 'processing',
      customer: { ...user, phone: data.phone },
      deliveryMethod: data.deliveryMethod,
      paymentMethod: data.paymentMethod,
      comment: data.comment,
      ...(data.deliveryMethod === 'courier'
        ? { deliveryAddress: `г. ${data.city}, ${data.address}` }
        : { pickupPointId: data.pickupPoint }),
    });
  }
  return (
    <form
      className="flex items-start gap-5 py-10"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex w-145 flex-col gap-6">
        <PaymentMethodPicker active={paymentMethod} control={form.control} />
        <DeliveryMethodPicker active={deliveryMethod} control={form.control} />
        <CustomerInfo control={form.control} />
      </div>
      <OrderSummary />
    </form>
  );
}
