import { useMemo } from "react";

import ExamsStats from "@/components/Exams/ExamsStats";

import { useProfessorExamsStats } from "@/hooks/professor/useProfessorExamsStats";

type Props = {
  professorId: string;
  courseIds: string[];
  selectedCourseId: "all" | (string & {});
};

const ProfessorExamsStats = ({ professorId, selectedCourseId, courseIds }: Props) => {
  const { data: stats, isPending } = useProfessorExamsStats(professorId);

  const targetCourseIds = useMemo(
    () => (selectedCourseId === "all" ? courseIds : [selectedCourseId]),
    [courseIds, selectedCourseId],
  );

  return <ExamsStats stats={stats} isLoading={isPending} courseIds={targetCourseIds} />;
};

export default ProfessorExamsStats;
