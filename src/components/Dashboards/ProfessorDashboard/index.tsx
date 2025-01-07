import { useMemo } from "react";

import ProfessorNumStats from "@/components/Dashboards/ProfessorDashboard/ProfessorNumStats";
import ExamsStats from "@/components/Exams/ExamsStats";
import { DashboardWindow } from "@/components/ui/DashboardWindow";

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
    <div className="flex h-full flex-col gap-6">
      <ProfessorNumStats />

      <div className="flex flex-1 items-stretch gap-6 *:flex-1 lg:flex-col">
        <DashboardWindow>Calendar</DashboardWindow>
        <DashboardWindow>Top 3 Courses</DashboardWindow>
      </div>

      <DashboardWindow>
        <ExamsStats stats={stats} isLoading={isPending} courseIds={courseIds} className="max-h-[320px]" />
      </DashboardWindow>
    </div>
  );
};

export default ProfessorDashboard;
