const pulse = "animate-pulse rounded-[var(--radius-md)] bg-surface";

export function ProductSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-14 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2.5">
          <div className={`aspect-square ${pulse}`} />
          <div className={`mt-1.5 h-3 w-4/5 ${pulse}`} />
          <div className={`h-3 w-1/4 ${pulse}`} />
        </div>
      ))}
    </div>
  );
}
