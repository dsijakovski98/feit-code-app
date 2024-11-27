import { useMemo } from "react";

import ExamAlert from "@/components/Exams/OngoingExamAlert/ExamAlert";

import { ROUTES } from "@/constants/routes";
import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { useStudentSubmissions } from "@/hooks/student/useStudentSubmissions";
import { FCStudent } from "@/hooks/useFCUser";

type Props = {
  user: FCStudent;
};

const StudentExamAlert = ({ user }: Props) => {
  const { data: courses } = useStudentCoursesList(user.id);

  const { isLoading, data: submissions } = useStudentSubmissions(user.id);

  const courseIds = useMemo(() => {
    const validCourses = courses?.filter((course) =>
      submissions?.every((submission) => submission.exam.courseId !== course.id),
    );

    return validCourses?.map((course) => course.id);
  }, [courses, submissions]);

  if (courseIds?.length === 0) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <ExamAlert
      courseIds={courseIds}
      join={{
        label: "Join",
        getHref: (examId) => `${ROUTES.examSession}/${examId}`,
      }}
    />
  );
};

export default StudentExamAlert;
