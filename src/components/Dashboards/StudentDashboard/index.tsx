import { useMemo } from "react";

import StudentNumStats from "@/components/Dashboards/StudentDashboard/StudentNumStats";
import ExamsStats from "@/components/Exams/ExamsStats";
import { DashboardWindow } from "@/components/ui/DashboardWindow";

import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { useStudentExamsStats } from "@/hooks/student/useStudentExamsStats";
import { FCStudent } from "@/hooks/useFCUser";

type Props = {
  user: FCStudent;
};

const StudentDashboard = ({ user }: Props) => {
  const { data: courses } = useStudentCoursesList(user.id);
  const courseIds = useMemo(() => courses?.map((course) => course.id) ?? [], [courses]);

  const { data: stats, isPending } = useStudentExamsStats({ studentId: user.id, courseIds });

  return (
    <div className="flex h-full flex-col gap-4">
      <StudentNumStats />

      <div className="flex flex-1 items-stretch gap-6 *:flex-1 lg:flex-col">
        <DashboardWindow>Calendar</DashboardWindow>
        <DashboardWindow>Top 3 Courses</DashboardWindow>
      </div>

      <DashboardWindow>
        <ExamsStats stats={stats} isLoading={isPending} courseIds={courseIds} className="h-[320px]" />
      </DashboardWindow>
    </div>
  );
};

export default StudentDashboard;
