import type { userLanguages } from '@/lib/constants';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  language?: UserLanguage;
  notifyByEmail?: boolean;
  createdAt: string;
};

export type UserProfile = User;
export type UserLanguage = (typeof userLanguages)[number];
export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
