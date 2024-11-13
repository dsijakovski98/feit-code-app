import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { CircularProgress } from "@nextui-org/react";

import { ROUTES } from "@/constants/routes";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import ExamSessionProvider from "@/context/ExamSessionContext";
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
    return (
      <div className="bg-dots grid min-h-dvh place-items-center brightness-75">
        <CircularProgress aria-label="Loading exam session..." size="lg" className="scale-[2]" />
      </div>
    );
  }

  return (
    <ExamSessionProvider exam={examDetails} student={userData.user}>
      <Outlet />
    </ExamSessionProvider>
  );
};

export default StudentExamLayout;
