import { Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "@nextui-org/spinner";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import ExamDetailsProvider from "@/context/ExamDetailsContext";
import { useExamDetails } from "@/hooks/exam/useExamDetails";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorExamDetails = lazy(() => import("@/components/Exams/ProfessorExams/ExamDetails"));
const StudentExamDetails = lazy(() => import("@/components/Exams/StudentExams/ExamDetails"));

const ExamDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { userData, isLoading: userIsLoading } = useFCUser();
  const { data, error, isLoading } = useExamDetails(id);

  if (error) {
    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <h2 className="text-2xl font-medium text-danger">{error.message}</h2>
        <Button
          variant="light"
          color="default"
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to={ROUTES.exams}
          className="text-base"
          startContent={<Icon name="left" className="h-5 w-5" />}
        >
          Back to Exams
        </Button>
      </section>
    );
  }

  if (isLoading || userIsLoading) {
    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <Spinner size="lg" className="scale-150" />
      </section>
    );
  }

  if (!data || !userData) {
    return null;
  }

  return (
    <ExamDetailsProvider examDetails={data}>
      <Suspense fallback={null}>
        {userData.type === USER_TYPE.student ? <StudentExamDetails /> : <ProfessorExamDetails />}
      </Suspense>
    </ExamDetailsProvider>
  );
};

export default ExamDetailsPage;
