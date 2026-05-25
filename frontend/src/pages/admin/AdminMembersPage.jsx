import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/api';

export default function AdminMembersPage() {
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['admin', 'members'],
    queryFn: () => adminApi.members().then((r) => r.data),
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Members</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">Registered gym members</p>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/70">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {members.map((m) => (
              <tr key={m.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">
                  {m.firstName} {m.lastName}
                </td>
                <td className="px-4 py-3">{m.email}</td>
                <td className="px-4 py-3">{m.phone || '—'}</td>
                <td className="px-4 py-3">{new Date(m.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
