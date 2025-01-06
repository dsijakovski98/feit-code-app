import CourseDetailsStats from "@/components/Courses/CourseDetailsStats";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useProfessorCourseDetailsStats } from "@/hooks/professor/useProfessorCourseDetailsStats";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

const ProfessorCourseStats = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);

  const { userData } = useFCUser();

  const { data: stats, isPending } = useProfessorCourseDetailsStats({
    courseId: courseDetails.id,
    professorId: userData?.user.id ?? "",
  });

  if (!userData) return null;

  return <CourseDetailsStats avg stats={stats} isLoading={isPending} height={320} />;
};

export default ProfessorCourseStats;
