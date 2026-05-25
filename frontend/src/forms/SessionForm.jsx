import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { CATEGORIES } from '../utils/constants';

const toLocalDatetime = (date) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

export default function SessionForm({ defaultValues, onSubmit, onCancel, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          startTime: toLocalDatetime(defaultValues.startTime),
          endTime: toLocalDatetime(defaultValues.endTime),
        }
      : {
          title: '',
          description: '',
          trainerName: '',
          category: 'HIIT',
          startTime: '',
          endTime: '',
          capacity: 20,
          location: 'Main Hall',
          isActive: true,
        },
  });

  const submit = (data) => {
    onSubmit({
      ...data,
      capacity: Number(data.capacity),
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
      isActive: data.isActive === true || data.isActive === 'true',
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input label="Title" error={errors.title?.message} {...register('title', { required: true })} />
      <div>
        <label className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
          rows={3}
          {...register('description', { required: true })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Trainer" {...register('trainerName', { required: true })} />
        <div>
          <label className="mb-1.5 block text-sm font-medium">Category</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
            {...register('category', { required: true })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Start" type="datetime-local" {...register('startTime', { required: true })} />
        <Input label="End" type="datetime-local" {...register('endTime', { required: true })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Capacity" type="number" {...register('capacity', { required: true, min: 1 })} />
        <Input label="Location" {...register('location')} />
      </div>
      {defaultValues && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('isActive')} />
          Active session
        </label>
      )}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" loading={loading}>
          {defaultValues ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
