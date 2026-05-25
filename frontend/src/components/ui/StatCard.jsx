import { motion } from 'framer-motion';
import Card from './Card';

export default function StatCard({ title, value, icon: Icon, trend, color = 'brand' }) {
  const colors = {
    brand: 'from-brand-500 to-brand-700',
    accent: 'from-accent-500 to-accent-600',
    emerald: 'from-emerald-500 to-teal-600',
    rose: 'from-rose-500 to-pink-600',
  };

  return (
    <Card hover className="relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${colors[color]} opacity-10`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-3xl font-bold text-slate-900 dark:text-white"
          >
            {value}
          </motion.p>
          {trend && <p className="mt-1 text-xs text-emerald-500">{trend}</p>}
        </div>
        {Icon && (
          <div className={`rounded-xl bg-gradient-to-br ${colors[color]} p-3 text-white shadow-lg`}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </Card>
  );
}
