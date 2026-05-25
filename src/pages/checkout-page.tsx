import { CustomerInfoForm } from '@/components/checkout-page/customer-info-form';
import { DeliveryMethodPicker } from '@/components/checkout-page/delivery-method-picker';
import { OrderSummary } from '@/components/checkout-page/order-summary';
import { PaymentMethodPicker } from '@/components/checkout-page/payment-method-picker';

export function CheckoutPage() {
  return (
    <div className="flex items-start gap-5 py-10">
      <div className="flex w-145 flex-col gap-6">
        <PaymentMethodPicker />
        <DeliveryMethodPicker />
        <CustomerInfoForm />
      </div>
      <OrderSummary />
    </div>
  );
}
