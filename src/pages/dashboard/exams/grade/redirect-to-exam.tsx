import { Navigate, useParams } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

const GradeExamRedirect = () => {
  const { id } = useParams<{ id: string }>();

  return <Navigate to={`${ROUTES.exams}/${id}`} replace />;
};

export default GradeExamRedirect;
