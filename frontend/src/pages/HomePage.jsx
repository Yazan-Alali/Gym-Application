import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiShield, FiZap } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../context/authSlice';
import Button from '../components/ui/Button';

const features = [
  { icon: FiCalendar, title: 'Smart Booking', desc: 'Book training sessions in seconds with real-time availability.' },
  { icon: FiZap, title: 'Expert Trainers', desc: 'HIIT, strength, yoga, and more — led by certified coaches.' },
  { icon: FiShield, title: 'Secure Access', desc: 'JWT-secured accounts with role-based member and admin portals.' },
];

export default function HomePage() {
  const { isAuthenticated, user } = useSelector(selectAuth);

  return (
    <div>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 p-8 sm:p-12 lg:p-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="relative max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400"
          >
            Core Gym Club AB
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Your premium <span className="text-gradient">fitness</span> experience starts here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-400"
          >
            Discover sessions, book instantly, and manage your training journey — all in one beautiful platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {isAuthenticated ? (
              <Link to={user?.role === 'Admin' ? '/admin' : '/dashboard'}>
                <Button>
                  Go to Dashboard <FiArrowRight />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button>Start Free <FiArrowRight /></Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/60"
          >
            <div className="mb-4 inline-flex rounded-xl bg-brand-500/10 p-3 text-brand-500">
              <f.icon size={24} />
            </div>
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
