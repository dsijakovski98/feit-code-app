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
    <div className="bg-main h-full px-8 py-6 lg:p-5 lg:pb-20">
      <Suspense fallback={null}>
        {userData.type === USER_TYPE.student ? (
          <StudentDashboard user={userData.user} />
        ) : (
          <ProfessorDashboard user={userData.user} />
        )}
      </Suspense>
    </div>
  );
};

export default Dashboard;
