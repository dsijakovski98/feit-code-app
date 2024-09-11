import { useMemo } from "react";

import clsx from "clsx";

import { Skeleton } from "@nextui-org/react";

import ProfileManagement from "@/components/ProfileManagement";

import { useFCUser } from "@/hooks/useFCUser";
import { getSchoolYear } from "@/utils";

const ProfilePage = () => {
  const { userData } = useFCUser();

  const schoolYear = useMemo(() => getSchoolYear(), []);

  return (
    <div className="pt-5">
      <div className="flex items-baseline justify-between">
        <div>
          <Skeleton
            isLoaded={!!userData}
            className={clsx("mb-2 h-5 w-52 rounded-lg", {
              "mb-0 h-auto w-auto": !!userData,
            })}
          >
            <h2 className="text-3xl font-bold">{userData?.fcUser.firstName}'s Profile</h2>
          </Skeleton>

          <Skeleton
            isLoaded={!!userData}
            className={clsx("h-4 w-40 rounded-lg", {
              "h-auto w-auto": !!userData,
            })}
          >
            <p>{userData?.fcUser.email}</p>
          </Skeleton>
        </div>

        <div>
          <p className="font-mono text-6xl font-bold">{schoolYear}</p>
          <p className="text-end">School year</p>
        </div>
      </div>

      <div className="-translate-y-9">
        <ProfileManagement />
      </div>
    </div>
  );
};

export default ProfilePage;
