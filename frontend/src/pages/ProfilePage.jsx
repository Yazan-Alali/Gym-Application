import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { selectAuth, updateUser } from '../context/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function ProfilePage() {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const profileForm = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone || '',
    },
  });

  const passwordForm = useForm();

  const onProfileSubmit = async (data) => {
    try {
      const { data: updated } = await authApi.updateProfile(data);
      dispatch(updateUser(updated));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      await authApi.changePassword(data);
      toast.success('Password changed');
      passwordForm.reset();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">Profile</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">Manage your account settings</p>

      <Card className="mb-6">
        <p className="text-sm text-slate-500">Email</p>
        <p className="font-semibold">{user?.email}</p>
        <p className="mt-2 text-sm text-slate-500">Role</p>
        <p className="font-semibold">{user?.role}</p>
      </Card>

      <Card className="mb-6">
        <h2 className="mb-4 text-lg font-bold">Personal information</h2>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" {...profileForm.register('firstName', { required: true })} />
            <Input label="Last name" {...profileForm.register('lastName', { required: true })} />
          </div>
          <Input label="Phone" {...profileForm.register('phone')} />
          <Button type="submit" loading={profileForm.formState.isSubmitting}>
            Save changes
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-bold">Change password</h2>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <Input
            label="Current password"
            type="password"
            {...passwordForm.register('currentPassword', { required: true })}
          />
          <Input
            label="New password"
            type="password"
            {...passwordForm.register('newPassword', { required: true, minLength: 6 })}
          />
          <Button type="submit" loading={passwordForm.formState.isSubmitting}>
            Update password
          </Button>
        </form>
      </Card>
    </div>
  );
}
