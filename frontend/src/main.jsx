import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './context/store';
import { setTheme } from './context/themeSlice';
import App from './App';
import './index.css';

const theme = localStorage.getItem('cgc_theme') || 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');
store.dispatch(setTheme(theme));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30000, refetchOnWindowFocus: false },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white',
              duration: 4000,
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
