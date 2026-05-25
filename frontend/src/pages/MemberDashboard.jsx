import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { bookingsApi, sessionsApi } from '../services/api';
import { selectAuth } from '../context/authSlice';
import StatCard from '../components/ui/StatCard';
import SessionCard from '../components/ui/SessionCard';
import BookingCard from '../components/ui/BookingCard';
import Button from '../components/ui/Button';
import { SessionCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';

export default function MemberDashboard() {
  const { user } = useSelector(selectAuth);

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings', 'upcoming'],
    queryFn: () => bookingsApi.my(true).then((r) => r.data),
  });

  const { data: sessionsData, isLoading } = useQuery({
    queryKey: ['sessions', 'available'],
    queryFn: () =>
      sessionsApi.list({ onlyAvailable: true, pageSize: 3 }).then((r) => r.data),
  });

  const sessions = sessionsData?.items || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your training schedule and discover new sessions.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <StatCard title="Upcoming bookings" value={bookings.length} icon={FiCalendar} color="brand" />
        <StatCard title="Available sessions" value={sessionsData?.totalCount ?? '—'} color="accent" />
        <StatCard title="Membership" value="Active" trend="Member account" color="emerald" />
      </div>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Upcoming bookings</h2>
          <Link to="/bookings">
            <Button variant="ghost">
              View all <FiArrowRight />
            </Button>
          </Link>
        </div>
        {bookings.length === 0 ? (
          <EmptyState
            icon={FiCalendar}
            title="No upcoming bookings"
            description="Browse available sessions and book your next workout."
            action={
              <Link to="/sessions">
                <Button>Browse sessions</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {bookings.slice(0, 2).map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Available sessions</h2>
          <Link to="/sessions">
            <Button variant="ghost">
              See all <FiArrowRight />
            </Button>
          </Link>
        </div>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SessionCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {sessions.map((s) => (
              <SessionCard key={s.id} session={s} showBook={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
