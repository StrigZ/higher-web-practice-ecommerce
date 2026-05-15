import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../components/layout';
import { StubPage } from '../pages/_StubPage';

import { ProtectedRoute } from '@/components/layout/protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <StubPage title="Каталог" />,
      },
      { path: 'product/:id', element: <StubPage title="Продукт ..." /> },

      {
        path: 'login',
        element: (
          <ProtectedRoute access="guest">
            <StubPage title="Войти" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute access="guest">
            <StubPage title="Зарегистрироваться" />
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
