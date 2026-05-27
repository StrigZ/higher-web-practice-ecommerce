import type { CartItem } from './cart';

import type { deliveryMethods, paymentMethods } from '@/lib/constants';

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  items: CartItem[];
  totalPrice: number;

  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;

  deliveryAddress?: Address;
  pickupPointId?: string;

  customer: OrderCustomerInfo;

  comment?: string;

  createdAt: string;
};

export type OrderItem = {
  productId: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = (typeof paymentMethods)[number];

export type DeliveryMethod = (typeof deliveryMethods)[number];

export type Address = {
  city: string;
};

export type PickupPoint = {
  id: string;
  name: string;
  address: string;
};

export type OrderCustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CreateOrderPayload = {
  phone: string;
  comment?: string;

  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;

  deliveryAddress?: Address;
  pickupPointId?: string;
};
