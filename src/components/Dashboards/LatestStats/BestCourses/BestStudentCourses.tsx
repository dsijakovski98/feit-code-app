import BestCourses from "@/components/Dashboards/LatestStats/BestCourses";

import { useStudentCoursesStats } from "@/hooks/student/useStudentCoursesStats";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const BestStudentCourses = () => {
  const { userData } = useFCUser();

  const { data: stats, isPending } = useStudentCoursesStats(userData?.user.id ?? "");

  return <BestCourses type={USER_TYPE.student} stats={stats} isLoading={isPending} />;
};

export default BestStudentCourses;
