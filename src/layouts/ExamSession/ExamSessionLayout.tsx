import { Navigate, Outlet, useParams } from "react-router-dom";

import { CircularProgress } from "@nextui-org/progress";

import { ROUTES } from "@/constants/routes";
import ExamDetailsProvider from "@/context/ExamDetailsContext";
import { useExamDetails } from "@/hooks/exam/useExamDetails";

const ExamSessionLayout = () => {
  const { id } = useParams<{ id: string }>();

  const { data: exam, error, isLoading } = useExamDetails(id);

  if (isLoading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-dots-light dark:bg-dots-dark">
        <CircularProgress aria-label="Loading exam session..." size="lg" className="scale-[2]" />
      </div>
    );
  }

  if (error || !exam) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <ExamDetailsProvider examDetails={exam}>
      <Outlet />
    </ExamDetailsProvider>
  );
};

export default ExamSessionLayout;
