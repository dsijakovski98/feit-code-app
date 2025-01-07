import { useMemo } from "react";

import UpcomingExam from "@/components/Dashboards/NumStats/UpcomingExam";

import { useUpcomingExam } from "@/hooks/exam/useUpcomingExam";
import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { FCStudent } from "@/hooks/useFCUser";

type Props = {
  user: FCStudent;
};

const StudentUpcomingExam = ({ user }: Props) => {
  const { data: courses } = useStudentCoursesList(user.id);
  const courseIds = useMemo(() => courses?.map((course) => course.id) ?? [], [courses]);

  const { data: upcomingExam, isPending } = useUpcomingExam({ courseIds });

  return <UpcomingExam upcomingExam={upcomingExam} isLoading={isPending} />;
};

export default StudentUpcomingExam;
