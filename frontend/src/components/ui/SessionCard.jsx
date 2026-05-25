import { FiCalendar, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import { formatDateTime } from '../../utils/format';
import Button from './Button';
import Card from './Card';

export default function SessionCard({ session, onBook, bookingLoading, showBook = true }) {
  const spotsLeft = session.availableSpots;
  const isFull = session.isFull || spotsLeft <= 0;

  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <span className="inline-block rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
            {session.category}
          </span>
          <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{session.title}</h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            isFull
              ? 'bg-red-500/10 text-red-500'
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          }`}
        >
          {isFull ? 'Full' : `${spotsLeft} spots`}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
        {session.description}
      </p>

      <ul className="mb-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li className="flex items-center gap-2">
          <FiUser className="text-brand-500" /> {session.trainerName}
        </li>
        <li className="flex items-center gap-2">
          <FiCalendar className="text-brand-500" /> {formatDateTime(session.startTime)}
        </li>
        <li className="flex items-center gap-2">
          <FiClock className="text-brand-500" />
          {new Date(session.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </li>
        <li className="flex items-center gap-2">
          <FiMapPin className="text-brand-500" /> {session.location}
        </li>
      </ul>

      {showBook && onBook && (
        <Button
          className="w-full"
          onClick={() => onBook(session)}
          disabled={isFull || !session.isActive}
          loading={bookingLoading === session.id}
        >
          {isFull ? 'No spots available' : 'Book session'}
        </Button>
      )}
    </Card>
  );
}
