import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

// Protect exam session so only students enrolled in the course can access
const StudentExamLayout = () => {
  const { examDetails } = useCtx(ExamDetailsContext);

  const { userData } = useFCUser();
  const { data: studentCourses } = useStudentCoursesList(userData?.user.id || "");

  const validExam = useMemo(() => {
    if (!studentCourses) return null;

    return !!studentCourses?.find((course) => examDetails.courseId === course.id);
  }, [examDetails.courseId, studentCourses]);

  if (validExam === false) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  if (validExam === null || !userData) {
    return null;
  }

  return <Outlet />;
};

export default StudentExamLayout;
