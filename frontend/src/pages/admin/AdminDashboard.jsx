import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FiCalendar, FiClipboard, FiUsers, FiActivity } from 'react-icons/fi';
import { adminApi } from '../../services/api';
import StatCard from '../../components/ui/StatCard';
import { StatCardSkeleton } from '../../components/ui/Skeleton';

const COLORS = ['#1a7af5', '#7c3aed', '#ec4899', '#10b981', '#f59e0b'];

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => adminApi.dashboard().then((r) => r.data),
  });

  const { data: trends = [] } = useQuery({
    queryKey: ['admin', 'trends'],
    queryFn: () => adminApi.bookingTrends().then((r) => r.data),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: () => adminApi.categoryStats().then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Admin Dashboard
      </h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        Core Gym Club AB — Overview & analytics
      </p>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total users" value={stats?.totalUsers} icon={FiUsers} color="brand" />
        <StatCard title="Members" value={stats?.totalMembers} icon={FiUsers} color="accent" />
        <StatCard title="Confirmed bookings" value={stats?.totalBookings} icon={FiClipboard} color="emerald" />
        <StatCard title="Active sessions" value={stats?.activeSessions} icon={FiCalendar} color="rose" />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Upcoming bookings" value={stats?.upcomingBookings} icon={FiActivity} />
        <StatCard title="Total capacity" value={stats?.totalCapacity} />
        <StatCard title="Available spots" value={stats?.availableSpots} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="mb-4 font-bold text-slate-900 dark:text-slate-100">Bookings — Last 7 days</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#33415530" />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a7af5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="mb-4 font-bold text-slate-900 dark:text-slate-100">Bookings by category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="bookingCount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ category }) => category}
              >
                {categories.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
