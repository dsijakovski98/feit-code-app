import { useMemo } from "react";

import ExamAlert from "@/components/Exams/OngoingExamAlert/ExamAlert";

import { ROUTES } from "@/constants/routes";
import { useProfessorCoursesList } from "@/hooks/professor/useProfessorCoursesList";
import { FCProfessor } from "@/hooks/useFCUser";

type Props = {
  user: FCProfessor;
};

const ProfessorExamAlert = ({ user }: Props) => {
  const { data: courses } = useProfessorCoursesList({ userId: user.id, type: user.type });
  const courseIds = useMemo(() => courses?.map((course) => course.id), [courses]);

  return (
    <ExamAlert
      courseIds={courseIds}
      join={{
        label: "Monitor",
        getHref: (examId) => `${ROUTES.dashboard}${ROUTES.exams}/${examId}#monitor`,
      }}
    />
  );
};

export default ProfessorExamAlert;
