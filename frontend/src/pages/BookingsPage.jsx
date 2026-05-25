import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiCalendar } from 'react-icons/fi';
import { bookingsApi } from '../services/api';
import BookingCard from '../components/ui/BookingCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { SessionCardSkeleton } from '../components/ui/Skeleton';

export default function BookingsPage() {
  const [tab, setTab] = useState('upcoming');
  const [cancelBooking, setCancelBooking] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings', tab],
    queryFn: () => bookingsApi.my(tab === 'upcoming').then((r) => r.data),
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => bookingsApi.cancel(id),
    onMutate: (id) => setCancelId(id),
    onSuccess: () => {
      toast.success('Booking cancelled');
      setCancelBooking(null);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => setCancelId(null),
  });

  const filtered =
    tab === 'history'
      ? bookings.filter((b) => b.status === 'Cancelled' || new Date(b.startTime) < new Date())
      : bookings;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">My bookings</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">View and manage your training reservations</p>

      <div className="mb-8 flex gap-2">
        {['upcoming', 'history'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t
                ? 'gradient-primary text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <SessionCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <EmptyState
          icon={FiCalendar}
          title={`No ${tab} bookings`}
          description="Book a session to see it here."
        />
      )}

      <div className="space-y-4">
        {filtered.map((b) => (
          <BookingCard
            key={b.id}
            booking={b}
            onCancel={setCancelBooking}
            cancelLoading={cancelId}
          />
        ))}
      </div>

      <Modal isOpen={!!cancelBooking} onClose={() => setCancelBooking(null)} title="Cancel booking">
        {cancelBooking && (
          <>
            <p className="text-slate-600 dark:text-slate-400">
              Cancel your booking for <strong>{cancelBooking.sessionTitle}</strong>?
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setCancelBooking(null)}>
                Keep booking
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                loading={cancelMutation.isPending}
                onClick={() => cancelMutation.mutate(cancelBooking.id)}
              >
                Cancel booking
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
