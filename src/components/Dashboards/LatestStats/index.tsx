import { Suspense, lazy } from "react";

import LatestExams from "@/components/Dashboards/LatestStats/LatestExams";
import { DashboardWindow } from "@/components/ui/DashboardWindow";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const BestProfessorCourses = lazy(
  () => import("@/components/Dashboards/LatestStats/BestCourses/BestProfessorCourses"),
);
const BestStudentCourses = lazy(
  () => import("@/components/Dashboards/LatestStats/BestCourses/BestStudentCourses"),
);

const LatestStats = () => {
  const { userData } = useFCUser();

  return (
    <div className="flex flex-1 items-stretch gap-6 *:flex-1 lg:flex-col">
      <DashboardWindow isLoaded={!!useFCUser}>
        <LatestExams userData={userData!} />
      </DashboardWindow>

      <DashboardWindow isLoaded={!!userData}>
        <Suspense fallback={null}>
          {userData?.type === USER_TYPE.student && <BestStudentCourses />}
          {userData?.type === USER_TYPE.professor && <BestProfessorCourses />}
        </Suspense>
      </DashboardWindow>
    </div>
  );
};

export default LatestStats;
