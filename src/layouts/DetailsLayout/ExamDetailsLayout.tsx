import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useExamDetails } from "@/hooks/exam/useExamDetails";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ExamDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { userData } = useFCUser();

  const { data } = useExamDetails(id);

  useEffect(() => {
    if (!data?.name) return;

    document.title = `FEIT Code | Exam: ${data.name}`;
  }, [data?.name]);

  if (!userData) return null;

  if (userData.type === USER_TYPE.student) {
    return <Navigate to={ROUTES.exams} />;
  }

  return <Outlet />;
};

export default ExamDetailsLayout;
