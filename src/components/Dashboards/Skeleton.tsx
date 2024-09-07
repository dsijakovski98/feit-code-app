import { Skeleton } from "@nextui-org/react";

const DashboardSkeleton = () => {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-[auto_1fr_1fr_1fr] gap-8 *:min-h-44 *:rounded-xl *:opacity-80">
      <Skeleton className="col-span-2 row-span-1" />
      <Skeleton className="col-span-1 col-start-3 row-span-4" />
      <Skeleton className="col-span-2 row-span-3" />
    </div>
  );
};

export default DashboardSkeleton;
