import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { bookingsApi, sessionsApi } from '../services/api';
import SessionCard from '../components/ui/SessionCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { SessionCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { CATEGORIES } from '../utils/constants';

export default function SessionsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [confirmSession, setConfirmSession] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sessions', search, category, onlyAvailable],
    queryFn: () =>
      sessionsApi
        .list({ search: search || undefined, category: category || undefined, onlyAvailable, pageSize: 50 })
        .then((r) => r.data),
  });

  const bookMutation = useMutation({
    mutationFn: (sessionId) => bookingsApi.book(sessionId),
    onMutate: (sessionId) => setBookingId(sessionId),
    onSuccess: () => {
      toast.success('Session booked successfully!');
      setConfirmSession(null);
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => setBookingId(null),
  });

  const sessions = data?.items || [];

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Training sessions</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">Find and book your next workout</p>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sessions..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="rounded"
          />
          Only available
        </label>
      </div>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SessionCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500">Failed to load sessions. Is the API running?</p>
      )}

      {!isLoading && sessions.length === 0 && (
        <EmptyState title="No sessions found" description="Try adjusting your filters or check back later." />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((s) => (
          <SessionCard
            key={s.id}
            session={s}
            onBook={setConfirmSession}
            bookingLoading={bookingId}
          />
        ))}
      </div>

      <Modal
        isOpen={!!confirmSession}
        onClose={() => setConfirmSession(null)}
        title="Confirm booking"
      >
        {confirmSession && (
          <>
            <p className="text-slate-600 dark:text-slate-400">
              Book <strong>{confirmSession.title}</strong> with {confirmSession.trainerName}?
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmSession(null)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                loading={bookMutation.isPending}
                onClick={() => bookMutation.mutate(confirmSession.id)}
              >
                Confirm
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
