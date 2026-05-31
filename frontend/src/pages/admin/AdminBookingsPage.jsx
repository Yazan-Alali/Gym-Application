import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '../../services/api';
import { formatDateTime } from '../../utils/format';

export default function AdminBookingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'bookings'],
    queryFn: () => bookingsApi.all({ pageSize: 100 }).then((r) => r.data),
  });

  const bookings = data?.items || [];

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Booking overview</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">All member reservations</p>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/70">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Member</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Email</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Session</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Start</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Booked at</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-900 dark:text-slate-100">
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-900 dark:text-slate-100 dark:text-slate-400">
                  No bookings yet
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{b.userName}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">{b.userEmail}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">{b.sessionTitle}</td>
                <td className="px-4 py-3">{formatDateTime(b.startTime)}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      b.status === 'Confirmed'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-slate-500/10 text-slate-500'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">{new Date(b.bookedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
