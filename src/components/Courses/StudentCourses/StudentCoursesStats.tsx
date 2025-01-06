import CoursesStats from "@/components/Courses/CoursesStats";

import { useStudentCoursesStats } from "@/hooks/student/useStudentCoursesStats";

type Props = {
  studentId: string;
};

const StudentCoursesStats = ({ studentId }: Props) => {
  const { data: stats, isPending } = useStudentCoursesStats(studentId);

  return <CoursesStats stats={stats} isLoading={isPending} mode="grade" />;
};

export default StudentCoursesStats;
