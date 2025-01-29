import { Navigate, Outlet, useParams } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useExamDetails } from "@/hooks/exam/useExamDetails";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ExamDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();

  const { userData } = useFCUser();

  const { error } = useExamDetails(id);

  if (error) {
    return <Navigate to={ROUTES.exams} replace />;
  }

  if (!userData) return null;

  if (userData.type === USER_TYPE.student) {
    return <Navigate to={ROUTES.exams} replace />;
  }

  return <Outlet />;
};

export default ExamDetailsLayout;
