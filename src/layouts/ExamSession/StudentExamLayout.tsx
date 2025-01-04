import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

import { CircularProgress } from "@nextui-org/progress";

import { ROUTES } from "@/constants/routes";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import ExamSessionProvider from "@/context/ExamSessionContext";
import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { useSubmissionDetails } from "@/hooks/submission/useSubmissionDetails";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

// Protect exam session so only students enrolled in the course can access
const StudentExamLayout = () => {
  const { examDetails } = useCtx(ExamDetailsContext);

  const { userData } = useFCUser();
  const { data: studentCourses } = useStudentCoursesList(userData?.user.id || "");

  const { data: submission } = useSubmissionDetails({
    examId: examDetails.id,
    studentId: userData?.user.id ?? "",
  });

  useEffect(() => {
    if (submission) {
      toast("You have already submitted this exam for grading!");
    }
  }, [submission]);

  const validExam = useMemo(() => {
    if (!studentCourses) return null;

    return !!studentCourses?.find((course) => examDetails.courseId === course.id);
  }, [examDetails.courseId, studentCourses]);

  if (validExam === false) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  if (validExam === null || !userData) {
    return (
      <div className="bg-dots grid min-h-dvh place-items-center brightness-75">
        <CircularProgress aria-label="Loading exam session..." size="lg" className="scale-[2]" />
      </div>
    );
  }

  if (submission) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return (
    <ExamSessionProvider exam={examDetails} student={userData.user}>
      <Outlet />
    </ExamSessionProvider>
  );
};

export default StudentExamLayout;
