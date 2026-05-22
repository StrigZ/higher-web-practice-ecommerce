import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../components/layout';
import { StubPage } from '../pages/_StubPage';

import { ProtectedRoute } from '@/components/protected-route';
import { CatalogPage } from '@/pages/catalog-page';
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
        element: (
          <ProtectedRoute access="auth">
            <StubPage title="Мой профиль" />
          </ProtectedRoute>
        ),
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
        path: 'checkout',
        element: (
          <ProtectedRoute access="auth">
            <StubPage title="Оформление заказа" />
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
            <StubPage title="Корзина" />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
