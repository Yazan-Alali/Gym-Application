import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { setCredentials } from '../context/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const onSubmit = async (data) => {
    try {
      const { data: res } = await authApi.login(data);
      dispatch(setCredentials({ token: res.token, user: res.user, expiresAt: res.expiresAt }));
      toast.success('Welcome back!');
      const dest = from || (res.user.role === 'Admin' ? '/admin' : '/dashboard');
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign in</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Access your Core Gym Club account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        No account?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:underline">
          Register
        </Link>
      </p>
      <p className="mt-4 rounded-xl bg-slate-100 p-3 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        Demo admin: admin@coregymclub.se / Admin123!
      </p>
    </div>
  );
}
