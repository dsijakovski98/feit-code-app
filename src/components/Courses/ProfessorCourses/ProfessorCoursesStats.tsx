import CoursesStats from "@/components/Courses/CoursesStats";

import { useProfessorCoursesStats } from "@/hooks/professor/useProfessorCoursesStats";
import { USER_TYPE } from "@/types";

type Props = {
  professorId: string;
};

const ProfessorCoursesStats = ({ professorId }: Props) => {
  const { data: stats, isPending } = useProfessorCoursesStats(professorId);

  return <CoursesStats type={USER_TYPE.professor} stats={stats} isLoading={isPending} mode="percentage" />;
};

export default ProfessorCoursesStats;
