import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../context/authSlice';

export function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useSelector(selectAuth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export function GuestRoute({ children }) {
  const { isAuthenticated, user } = useSelector(selectAuth);
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'Admin' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
}
