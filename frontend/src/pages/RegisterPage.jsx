import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { setCredentials } from '../context/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { data: res } = await authApi.register(data);
      dispatch(setCredentials({ token: res.token, user: res.user, expiresAt: res.expiresAt }));
      toast.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Join Core Gym Club AB today</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="First name"
            error={errors.firstName?.message}
            {...register('firstName', { required: 'Required' })}
          />
          <Input
            label="Last name"
            error={errors.lastName?.message}
            {...register('lastName', { required: 'Required' })}
          />
        </div>
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', { required: 'Required' })}
        />
        <Input label="Phone (optional)" {...register('phone')} />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 characters' } })}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Register
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
