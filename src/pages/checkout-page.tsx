import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateOrderMutation } from '@/api/orders-api';
import { CustomerInfo } from '@/components/checkout-page/customer-info';
import { DeliveryMethodPicker } from '@/components/checkout-page/delivery-method-picker/delivery-method-picker';
import { OrderSummary } from '@/components/checkout-page/order-summary';
import { PaymentMethodPicker } from '@/components/checkout-page/payment-method-picker';
import { MobileMenu } from '@/components/layout/main-layout/mobile-menu/mobile-menu';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { useGetCurrentUserCart } from '@/hooks/use-get-current-user-cart';
import { cities, pickupPoints } from '@/lib/constants';
import {
  formSchema,
  type CheckoutFormValues,
} from '@/lib/form-schemas/order-form-schema';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useGetCurrentUser();
  const { cartItems, totalPrice, clearCart } = useGetCurrentUserCart();

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

  async function onSubmit(data: CheckoutFormValues) {
    if (!user) return;

    const { data: newOrder } = await createOrder({
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

    if (newOrder) {
      await clearCart();
      navigate(`/order/${newOrder.id}`, { state: { isNewOrder: true } });
    }
  }
  return (
    <div className="flex h-full flex-col">
      <form
        className="flex h-full flex-1 flex-col overflow-y-auto sm:px-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:py-10">
          <div className="flex h-full flex-1 flex-col gap-6 p-5 sm:p-0">
            <PaymentMethodPicker
              active={paymentMethod}
              control={form.control}
            />
            <DeliveryMethodPicker
              active={deliveryMethod}
              control={form.control}
            />
            <CustomerInfo control={form.control} />
          </div>
          <OrderSummary className="sticky bottom-0 w-full border-t" />
        </div>
      </form>

      <MobileMenu />
    </div>
  );
}
