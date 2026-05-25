import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const sessionsApi = {
  list: (params) => api.get('/sessions', { params }),
  get: (id) => api.get(`/sessions/${id}`),
  categories: () => api.get('/sessions/categories'),
  create: (data) => api.post('/sessions', data),
  update: (id, data) => api.put(`/sessions/${id}`, data),
  remove: (id) => api.delete(`/sessions/${id}`),
};

export const bookingsApi = {
  my: (upcomingOnly = false) => api.get('/bookings/my', { params: { upcomingOnly } }),
  book: (sessionId) => api.post('/bookings', { sessionId }),
  cancel: (id) => api.delete(`/bookings/${id}`),
  all: (params) => api.get('/bookings', { params }),
};

export const adminApi = {
  dashboard: () => api.get('/admin/dashboard'),
  bookingTrends: () => api.get('/admin/analytics/bookings-trend'),
  categoryStats: () => api.get('/admin/analytics/categories'),
  members: () => api.get('/admin/members'),
};

export default api;
