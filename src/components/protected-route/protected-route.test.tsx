import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, type NavigateProps } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { ProtectedRoute } from './protected-route';

import { rootReducer } from '@/store/store';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  Navigate: vi
    .fn()
    .mockImplementation(({ to, state, replace }: NavigateProps) => (
      <div
        data-replace={replace ? 'true' : 'false'}
        data-state={state !== undefined ? JSON.stringify(state) : undefined}
        data-testid="navigate"
        data-to={JSON.stringify(to)}
      />
    )),
}));

function renderProtectedRoute(
  ui: React.ReactElement,
  {
    isAuth = false,
    initialPath = '/',
    locationState = undefined,
  }: {
    isAuth?: boolean;
    initialPath?: string;
    locationState?: unknown;
  } = {},
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      user: {
        userId: isAuth ? 'user-123' : null,
        isAuth,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: initialPath, state: locationState }]}
      >
        {ui}
      </MemoryRouter>
    </Provider>,
  );
}

describe('ProtectedRoute', () => {
  describe('access="auth"', () => {
    it('redirects to /login when NOT authenticated', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="auth">
          <div>Protected Content</div>
        </ProtectedRoute>,
        { isAuth: false },
      );

      expect(
        page.getByText('Protected Content').query(),
      ).not.toBeInTheDocument();

      const nav = page.getByTestId('navigate');
      await expect.element(nav).toBeInTheDocument();
      await expect
        .element(nav)
        .toHaveAttribute('data-to', JSON.stringify('/login'));

      const stateAttr = nav.element().getAttribute('data-state');
      const state = JSON.parse(stateAttr!);
      expect(state).toHaveProperty('from.pathname', '/');
    });

    it('renders children when authenticated', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="auth">
          <div>Protected Content</div>
        </ProtectedRoute>,
        { isAuth: true },
      );

      await expect
        .element(page.getByText('Protected Content'))
        .toBeInTheDocument();
      expect(page.getByTestId('navigate').query()).not.toBeInTheDocument();
    });
  });

  describe('access="guest"', () => {
    it('redirects authenticated user to location.state.from when present', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="guest">
          <div>Guest Content</div>
        </ProtectedRoute>,
        {
          isAuth: true,
          initialPath: '/login',
          locationState: { from: { pathname: '/dashboard' } },
        },
      );

      expect(page.getByText('Guest Content').query()).not.toBeInTheDocument();

      const nav = page.getByTestId('navigate');
      await expect.element(nav).toBeInTheDocument();
      await expect
        .element(nav)
        .toHaveAttribute('data-to', JSON.stringify({ pathname: '/dashboard' }));
      await expect.element(nav).not.toHaveAttribute('data-state');
    });

    it('redirects to "/" when no location.state.from is set', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="guest">
          <div>Guest Content</div>
        </ProtectedRoute>,
        { isAuth: true, initialPath: '/login' },
      );

      expect(page.getByText('Guest Content').query()).not.toBeInTheDocument();

      const nav = page.getByTestId('navigate');
      await expect.element(nav).toBeInTheDocument();
      await expect.element(nav).toHaveAttribute('data-to', JSON.stringify('/'));
    });

    it('renders children when NOT authenticated', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="guest">
          <div>Guest Content</div>
        </ProtectedRoute>,
        { isAuth: false },
      );

      await expect.element(page.getByText('Guest Content')).toBeInTheDocument();
      expect(page.getByTestId('navigate').query()).not.toBeInTheDocument();
    });
  });

  describe('access="any"', () => {
    it('renders children when authenticated', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="any">
          <div>Public Content</div>
        </ProtectedRoute>,
        { isAuth: true },
      );

      await expect
        .element(page.getByText('Public Content'))
        .toBeInTheDocument();
      expect(page.getByTestId('navigate').query()).not.toBeInTheDocument();
    });

    it('renders children when NOT authenticated', async () => {
      renderProtectedRoute(
        <ProtectedRoute access="any">
          <div>Public Content</div>
        </ProtectedRoute>,
        { isAuth: false },
      );

      await expect
        .element(page.getByText('Public Content'))
        .toBeInTheDocument();
      expect(page.getByTestId('navigate').query()).not.toBeInTheDocument();
    });
  });
});
