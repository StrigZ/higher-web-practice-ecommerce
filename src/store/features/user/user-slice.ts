import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/types';

export interface UserState {
  userId: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  userId: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: User['id'] }>) => {
      state.userId = action.payload.userId;
      state.isAuth = true;
    },
    clearUser: (state) => {
      state.userId = null;
      state.isAuth = false;
    },
  },
});
