import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const stored = localStorage.getItem('cgc_theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
document.documentElement.classList.toggle('dark', getInitialTheme() === 'dark');
const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('cgc_theme', state.mode);
      document.documentElement.classList.toggle('dark', state.mode === 'dark');
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('cgc_theme', state.mode);
      document.documentElement.classList.toggle('dark', state.mode === 'dark');
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
