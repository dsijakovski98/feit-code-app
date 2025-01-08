import BestCourses from "@/components/Dashboards/LatestStats/BestCourses";

import { useProfessorCoursesStats } from "@/hooks/professor/useProfessorCoursesStats";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const BestProfessorCourses = () => {
  const { userData } = useFCUser();

  const { data: stats, isPending } = useProfessorCoursesStats(userData?.user.id ?? "");

  return <BestCourses type={USER_TYPE.professor} stats={stats} isLoading={isPending} />;
};

export default BestProfessorCourses;
