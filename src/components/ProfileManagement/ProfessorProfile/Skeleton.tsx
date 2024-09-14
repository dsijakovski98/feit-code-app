import { Avatar, Skeleton } from "@nextui-org/react";

const ProfessorProfileSkeleton = () => {
  return (
    <div className="h-full space-y-10">
      <div className="mb-2 flex items-end justify-between">
        <div>
          <Avatar className="h-[100px] w-[100px] animate-pulse" />
        </div>

        <div className="w-[200px] space-y-2">
          <Skeleton className="ml-auto h-4 w-[60%] rounded-lg" />
          <Skeleton className="h-4 rounded-lg" />
        </div>
      </div>

      <Skeleton className="block h-16 rounded-lg" />

      <div className="flex justify-between gap-6">
        <Skeleton className="block h-16 w-full rounded-lg" />
        <Skeleton className="block h-16 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default ProfessorProfileSkeleton;
