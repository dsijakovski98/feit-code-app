import { Suspense, lazy } from "react";

import DashboardSkeleton from "@/components/Dashboards/Skeleton";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorDashboard = lazy(() => import("@/components/Dashboards/ProfessorDashboard"));
const StudentDashboard = lazy(() => import("@/components/Dashboards/StudentDashboard"));

const Dashboard = () => {
  const { userData } = useFCUser();

  return (
    <div className="h-full px-8 pb-8">
      {userData ? (
        <Suspense fallback={null}>
          {userData.type === USER_TYPE.student ? <StudentDashboard /> : <ProfessorDashboard />}
        </Suspense>
      ) : (
        <DashboardSkeleton />
      )}
    </div>
  );
};

export default Dashboard;
