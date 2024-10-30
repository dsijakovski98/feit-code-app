import { useMemo } from "react";

import ExamAlert from "@/components/Exams/OngoingExamAlert/ExamAlert";

import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { FCStudent } from "@/hooks/useFCUser";

type Props = {
  user: FCStudent;
};

const StudentExamAlert = ({ user }: Props) => {
  const { data: courses } = useStudentCoursesList(user.id);
  const courseIds = useMemo(() => courses?.map((course) => course.id), [courses]);

  return (
    <ExamAlert
      courseIds={courseIds}
      join={{
        label: "Join",
        getHref: () => "#",
      }}
    />
  );
};

export default StudentExamAlert;
