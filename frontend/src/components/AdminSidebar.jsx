import { NavLink } from 'react-router-dom';
import {
  FiBarChart2,
  FiCalendar,
  FiClipboard,
  FiGrid,
  FiUsers,
} from 'react-icons/fi';

const links = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', end: true },
  { to: '/admin/sessions', icon: FiCalendar, label: 'Sessions' },
  { to: '/admin/bookings', icon: FiClipboard, label: 'Bookings' },
  { to: '/admin/members', icon: FiUsers, label: 'Members' },
  { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
];

export default function AdminSidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-slate-200 bg-white pt-20 transition dark:border-slate-800 dark:bg-slate-950 lg:static lg:pt-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-4 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'gradient-primary text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
