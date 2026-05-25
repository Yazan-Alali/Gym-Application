import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { formatDateTime } from '../../utils/format';
import Button from './Button';
import Card from './Card';

export default function BookingCard({ booking, onCancel, cancelLoading }) {
  const isCancelled = booking.status === 'Cancelled';
  const isPast = new Date(booking.startTime) < new Date();

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              isCancelled
                ? 'bg-slate-500/10 text-slate-500'
                : 'bg-emerald-500/10 text-emerald-600'
            }`}
          >
            {booking.status}
          </span>
          <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
            {booking.sessionTitle}
          </h3>
          <p className="text-sm text-slate-500">{booking.category} · {booking.trainerName}</p>
        </div>
        {!isCancelled && !isPast && onCancel && (
          <Button variant="outline" onClick={() => onCancel(booking)} loading={cancelLoading === booking.id}>
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <FiCalendar /> {formatDateTime(booking.startTime)}
        </span>
        <span className="flex items-center gap-2">
          <FiMapPin /> {booking.location}
        </span>
      </div>
    </Card>
  );
}
