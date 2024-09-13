import { Avatar, Skeleton } from "@nextui-org/react";

const ProfileTabSkeleton = () => {
  return (
    <div className="h-full space-y-12 px-3">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <Avatar size="lg" className="scale-[1.5]" />
        </div>

        <div className="w-[200px] space-y-2">
          <Skeleton className="ml-auto h-4 w-[60%] rounded-lg" />
          <Skeleton className="h-4 rounded-lg" />
        </div>
      </div>

      <Skeleton className="block h-16 rounded-lg" />

      <Skeleton className="block h-16 rounded-lg" />

      <div className="flex justify-between gap-6">
        <Skeleton className="block h-16 w-full rounded-lg" />
        <Skeleton className="block h-16 w-full rounded-lg" />
      </div>

      <Skeleton className="block h-16 rounded-lg" />
    </div>
  );
};

export default ProfileTabSkeleton;
