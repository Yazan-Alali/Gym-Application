export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SessionCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
      <Skeleton className="mb-3 h-6 w-2/3" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
      <Skeleton className="mb-2 h-4 w-1/2" />
      <Skeleton className="h-8 w-1/3" />
    </div>
  );
}
