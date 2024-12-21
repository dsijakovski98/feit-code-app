import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useExamDetails } from "@/hooks/exam/useExamDetails";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ExamDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const { userData } = useFCUser();

  const { data, error } = useExamDetails(id);

  useEffect(() => {
    if (!data?.name) return;

    document.title = `FEIT Code | Exam: ${data.name}`;

    if (pathname.includes("/grade/")) {
      document.title += " - Grade Submissions";
    }
  }, [data?.name, pathname]);

  if (error) {
    return <Navigate to={ROUTES.exams} />;
  }

  if (!userData) return null;

  if (userData.type === USER_TYPE.student) {
    return <Navigate to={ROUTES.exams} />;
  }

  return <Outlet />;
};

export default ExamDetailsLayout;
