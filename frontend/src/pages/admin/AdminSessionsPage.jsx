import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { sessionsApi } from '../../services/api';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import SessionForm from '../../forms/SessionForm';
import { formatDateTime } from '../../utils/format';

export default function AdminSessionsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'sessions'],
    queryFn: () => sessionsApi.list({ includeInactive: true, pageSize: 100 }).then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing ? sessionsApi.update(editing.id, payload) : sessionsApi.create(payload),
    onSuccess: () => {
      toast.success(editing ? 'Session updated' : 'Session created');
      setModalOpen(false);
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ['admin', 'sessions'] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => sessionsApi.remove(id),
    onMutate: setDeleteId,
    onSuccess: () => {
      toast.success('Session deleted');
      queryClient.invalidateQueries({ queryKey: ['admin', 'sessions'] });
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => setDeleteId(null),
  });

  const sessions = data?.items || [];

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (session) => {
    setEditing(session);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Session management</h1>
          <p className="text-slate-600 dark:text-slate-400">Create and manage training schedules</p>
        </div>
        <Button onClick={openCreate}>
          <FiPlus /> New session
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/70">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Title</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Category</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Trainer</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Start</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Spots</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  Loading...
                </td>
              </tr>
            )}
            {sessions.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{s.title}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">{s.category}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">{s.trainerName}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">{formatDateTime(s.startTime)}</td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">
                  {s.availableSpots}/{s.capacity}
                </td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      s.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'
                    }`}
                  >
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 dark:text-slate-400">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(s)}
                      className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(s.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                      disabled={deleteId === s.id}
                      aria-label="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={editing ? 'Edit session' : 'Create session'}
        size="lg"
      >
        <SessionForm
          defaultValues={editing}
          onSubmit={(data) => saveMutation.mutate(data)}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          loading={saveMutation.isPending}
        />
      </Modal>
    </div>
  );
}
