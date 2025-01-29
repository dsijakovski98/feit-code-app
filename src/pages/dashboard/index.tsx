import { Fragment, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";

import DashboardSkeleton from "@/components/Dashboards/Skeleton";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorDashboard = lazy(() => import("@/components/Dashboards/ProfessorDashboard"));
const StudentDashboard = lazy(() => import("@/components/Dashboards/StudentDashboard"));

const Dashboard = () => {
  const { userData } = useFCUser();

  return (
    <Fragment>
      <Helmet>
        <title>FEIT Code | Dashboard</title>
        <meta
          name="description"
          content="Check out your latest stats and news regarding the Courses and Exams taking place this semester."
        />
      </Helmet>

      {!userData && <DashboardSkeleton />}

      {userData && (
        <div className="bg-main h-full px-8 py-6 lg:h-auto lg:p-5 lg:pb-20">
          <Suspense fallback={null}>
            {userData.type === USER_TYPE.student ? (
              <StudentDashboard user={userData.user} />
            ) : (
              <ProfessorDashboard user={userData.user} />
            )}
          </Suspense>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
