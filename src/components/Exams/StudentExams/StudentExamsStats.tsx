import { useMemo } from "react";

import ExamsStats from "@/components/Exams/ExamsStats";

import { useStudentExamsStats } from "@/hooks/student/useStudentExamsStats";

type Props = {
  studentId: string;
  courseIds: string[];
  selectedCourseId: "all" | (string & {});
};

const StudentExamsStats = ({ studentId, selectedCourseId, courseIds }: Props) => {
  const { data: stats, isPending } = useStudentExamsStats({ studentId, courseIds });

  const targetCourseIds = useMemo(
    () => (selectedCourseId === "all" ? courseIds : [selectedCourseId]),
    [courseIds, selectedCourseId],
  );

  return <ExamsStats stats={stats} isLoading={isPending} courseIds={targetCourseIds} />;
};

export default StudentExamsStats;
