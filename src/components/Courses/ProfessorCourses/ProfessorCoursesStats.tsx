import CoursesStats from "@/components/Courses/CoursesStats";

import { useProfessorCoursesStats } from "@/hooks/professor/useProfessorCoursesStats";

type Props = {
  professorId: string;
};

const ProfessorCoursesStats = ({ professorId }: Props) => {
  const { data: stats, isPending } = useProfessorCoursesStats(professorId);

  return <CoursesStats stats={stats} isLoading={isPending} mode="percentage" />;
};

export default ProfessorCoursesStats;
