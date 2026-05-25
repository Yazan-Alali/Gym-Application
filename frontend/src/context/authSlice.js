import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../utils/constants';

const loadUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUser(),
    token: localStorage.getItem(STORAGE_KEYS.TOKEN),
    isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user, expiresAt } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ ...user, expiresAt }));
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectIsAdmin = (state) => state.auth.user?.role === 'Admin';
export default authSlice.reducer;
