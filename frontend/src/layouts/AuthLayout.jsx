import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 gradient-primary lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link to="/" className="text-2xl font-bold text-white">
          {APP_NAME}
        </Link>
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Train smarter.<br />Book faster.
          </h1>
          <p className="mt-4 max-w-md text-white/80">
            {APP_TAGLINE} — Your premium destination for structured training sessions and expert coaching.
          </p>
        </div>
        <p className="text-sm text-white/60">© 2026 Core Gym Club AB</p>
      </div>
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <Link to="/" className="mb-8 text-xl font-bold text-gradient lg:hidden">
          {APP_NAME}
        </Link>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
