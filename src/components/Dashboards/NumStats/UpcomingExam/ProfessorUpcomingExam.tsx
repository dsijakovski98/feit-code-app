import { useMemo } from "react";

import UpcomingExam from "@/components/Dashboards/NumStats/UpcomingExam";

import { useUpcomingExam } from "@/hooks/exam/useUpcomingExam";
import { useProfessorCoursesList } from "@/hooks/professor/useProfessorCoursesList";
import { FCProfessor } from "@/hooks/useFCUser";

type Props = {
  user: FCProfessor;
};

const ProfessorUpcomingExam = ({ user }: Props) => {
  const { data: courses } = useProfessorCoursesList({ userId: user.id, type: user.type });
  const courseIds = useMemo(() => courses?.map((course) => course.id) ?? [], [courses]);

  const { data: upcomingExam, isPending } = useUpcomingExam({ courseIds });

  return <UpcomingExam upcomingExam={upcomingExam} isLoading={isPending} />;
};

export default ProfessorUpcomingExam;
