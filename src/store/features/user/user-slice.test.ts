/**
 * @vitest-environment jsdom
 */

import { configureStore } from '@reduxjs/toolkit';
import { expect, test, describe, beforeEach, vi } from 'vitest';

import { clearUser, setUser } from './user-slice';

import { rootReducer } from '@/store/store';
import type { User } from '@/types';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

function createStore() {
  return configureStore({ reducer: rootReducer });
}

const mockUser: User = {
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test',
  createdAt: new Date().toISOString(),
  id: crypto.randomUUID(),
};

describe('use slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('setUser saves userId to localStorage', () => {
    const store = createStore();
    store.dispatch(setUser({ userId: mockUser.id }));

    expect(store.getState().user.userId).toBe(mockUser.id);
    expect(store.getState().user.isAuth).toBe(true);

    expect(localStorage.setItem).toHaveBeenCalledWith('userId', mockUser.id);
  });

  test('clearUser removes userId from localStorage', async () => {
    const store = createStore();
    store.dispatch(setUser({ userId: mockUser.id }));
    store.dispatch(clearUser());

    expect(store.getState().user.userId).toBe(null);
    expect(store.getState().user.isAuth).toBe(false);

    expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
  });
});
