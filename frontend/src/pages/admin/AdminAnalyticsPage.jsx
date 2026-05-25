import { useQuery } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { adminApi } from '../../services/api';

export default function AdminAnalyticsPage() {
  const { data: trends = [] } = useQuery({
    queryKey: ['admin', 'trends'],
    queryFn: () => adminApi.bookingTrends().then((r) => r.data),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: () => adminApi.categoryStats().then((r) => r.data),
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Analytics</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">Detailed performance insights</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="mb-4 font-bold">Booking trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trends}>
              <defs>
                <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a7af5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1a7af5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#33415530" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#1a7af5" fill="url(#areaColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="mb-4 font-bold">Sessions per category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#33415530" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessionCount" fill="#7c3aed" name="Sessions" radius={[6, 6, 0, 0]} />
              <Bar dataKey="bookingCount" fill="#1a7af5" name="Bookings" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
