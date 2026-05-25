import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { StubPage } from '../pages/_StubPage';

import { MainLayout, ProfileLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/protected-route';
import { CartPage } from '@/pages/cart-page';
import { CatalogPage } from '@/pages/catalog-page';
import { CheckoutPage } from '@/pages/checkout-page';
import { LoginPage } from '@/pages/login-page';
import { ProductPage } from '@/pages/product-page';
import { RegisterPage } from '@/pages/register-page';
import { ProductPageProvider } from '@/providers/product-page-context/product-page-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CatalogPage />,
      },
      {
        path: 'product/:id',
        element: (
          <ProductPageProvider>
            <ProductPage />
          </ProductPageProvider>
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute access="guest">
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute access="guest">
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: <ProfileLayout />,
        children: [
          {
            element: (
              <ProtectedRoute access="auth">
                <StubPage title="профиль" />
              </ProtectedRoute>
            ),
            index: true,
          },
          {
            path: 'profile/edit',
            element: (
              <ProtectedRoute access="auth">
                <StubPage title="Редактирование профиля" />
              </ProtectedRoute>
            ),
          },
          {
            path: 'orders',
            element: (
              <ProtectedRoute access="auth">
                <StubPage title="Мои заказы" />
              </ProtectedRoute>
            ),
          },
          {
            path: 'order/:id',
            element: (
              <ProtectedRoute access="auth">
                <StubPage title="Заказ ..." />
              </ProtectedRoute>
            ),
          },
          {
            path: 'cart',
            element: (
              <ProtectedRoute access="auth">
                <CartPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute access="auth">
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
