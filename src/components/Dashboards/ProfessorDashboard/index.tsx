import { useMemo } from "react";

import LatestStats from "@/components/Dashboards/LatestStats";
import ProfessorNumStats from "@/components/Dashboards/ProfessorDashboard/ProfessorNumStats";
import ExamsStats from "@/components/Exams/ExamsStats";
import { DashboardWindow } from "@/components/ui/DashboardWindow";

import UserCoursesProvider from "@/context/UserCoursesContext";
import { useProfessorCoursesList } from "@/hooks/professor/useProfessorCoursesList";
import { useProfessorExamsStats } from "@/hooks/professor/useProfessorExamsStats";
import { FCProfessor } from "@/hooks/useFCUser";

type Props = {
  user: FCProfessor;
};

const ProfessorDashboard = ({ user }: Props) => {
  const { data: courses } = useProfessorCoursesList({ userId: user.id, type: user.type });
  const courseIds = useMemo(() => courses?.map((course) => course.id) ?? [], [courses]);

  const { data: stats, isPending } = useProfessorExamsStats(user.id);

  return (
    <UserCoursesProvider courseIds={courseIds}>
      <div className="flex h-full flex-col gap-6">
        <ProfessorNumStats />

        <LatestStats />

        <DashboardWindow>
          <ExamsStats stats={stats} isLoading={isPending} courseIds={courseIds} className="h-[300px]" />
        </DashboardWindow>
      </div>
    </UserCoursesProvider>
  );
};

export default ProfessorDashboard;
