import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/70 dark:shadow-slate-950/50 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
