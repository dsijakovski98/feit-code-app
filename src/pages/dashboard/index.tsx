import { Suspense, lazy } from "react";

import DashboardSkeleton from "@/components/Dashboards/Skeleton";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorDashboard = lazy(() => import("@/components/Dashboards/ProfessorDashboard"));
const StudentDashboard = lazy(() => import("@/components/Dashboards/StudentDashboard"));

const Dashboard = () => {
  const { userData } = useFCUser();

  if (!userData) return <DashboardSkeleton />;

  return (
    <div className="h-full bg-content1 p-8 dark:bg-default-100/50 lg:min-h-[inherit] lg:!bg-transparent">
      <Suspense fallback={null}>
        {userData.type === USER_TYPE.student ? <StudentDashboard /> : <ProfessorDashboard />}
      </Suspense>
    </div>
  );
};

export default Dashboard;
