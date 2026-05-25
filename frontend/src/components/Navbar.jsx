import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { logout, selectAuth } from '../context/authSlice';
import { toggleTheme } from '../context/themeSlice';
import { APP_NAME } from '../utils/constants';
import Button from './ui/Button';

export default function Navbar({ onMenuClick }) {
  const { user, isAuthenticated } = useSelector(selectAuth);
  const theme = useSelector((s) => s.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMobileOpen(false);
  };

  const links = isAuthenticated
    ? user?.role === 'Admin'
      ? [
          { to: '/admin', label: 'Dashboard' },
          { to: '/admin/sessions', label: 'Sessions' },
          { to: '/admin/bookings', label: 'Bookings' },
          { to: '/admin/members', label: 'Members' },
        ]
      : [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/sessions', label: 'Sessions' },
          { to: '/bookings', label: 'My Bookings' },
          { to: '/profile', label: 'Profile' },
        ]
    : [
        { to: '/', label: 'Home' },
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' },
      ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary font-bold text-white">
            CG
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{APP_NAME}</p>
            <p className="text-xs text-slate-500">Premium Fitness</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {user?.firstName} {user?.lastName}
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                <FiLogOut /> Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Button onClick={() => navigate('/register')}>Get Started</Button>
            </div>
          )}

          <button
            className="rounded-xl p-2.5 md:hidden"
            onClick={() => (onMenuClick ? onMenuClick() : setMobileOpen(!mobileOpen))}
            aria-label="Menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {mobileOpen && !onMenuClick && (
        <div className="border-t border-slate-200 px-4 py-4 md:hidden dark:border-slate-800">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="py-2 font-medium">
                {l.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button onClick={handleLogout} className="py-2 text-left font-medium text-red-500">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
