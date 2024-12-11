import { Navigate, Outlet, useParams } from "react-router-dom";

import { CircularProgress } from "@nextui-org/progress";

import { EXAM_STATUS } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
import ExamDetailsProvider from "@/context/ExamDetailsContext";
import { useExamDetails } from "@/hooks/exam/useExamDetails";

const ExamSessionLayout = () => {
  const { id } = useParams<{ id: string }>();

  const { data: exam, error, isLoading } = useExamDetails(id);

  if (isLoading) {
    return (
      <div className="bg-dots grid min-h-dvh place-items-center brightness-75">
        <CircularProgress aria-label="Loading exam session..." size="lg" className="scale-[2]" />
      </div>
    );
  }

  if (error || !exam) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  if (exam.status !== EXAM_STATUS.ongoing) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <ExamDetailsProvider examDetails={exam}>
      <Outlet />
    </ExamDetailsProvider>
  );
};

export default ExamSessionLayout;
