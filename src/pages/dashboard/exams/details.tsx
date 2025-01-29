import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "@heroui/spinner";

import ProfessorExamDetails from "@/components/Exams/ProfessorExams/ExamDetails";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import ExamDetailsProvider from "@/context/ExamDetailsContext";
import { useExamDetails } from "@/hooks/exam/useExamDetails";
import { useFCUser } from "@/hooks/useFCUser";
import { formatTimestamp } from "@/utils/dates";

const ExamDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { userData, isLoading: userIsLoading } = useFCUser();
  const { data: exam, error, isLoading } = useExamDetails(id);

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

  if (!exam || !userData) {
    return null;
  }

  return (
    <ExamDetailsProvider examDetails={exam}>
      <Helmet>
        <title>FEIT Code Exam | {exam.name}</title>
        <meta
          name="description"
          content={`${exam.name} - an exam for the ${exam.course.name} course, taking place on ${formatTimestamp(exam.startsAt)}`}
        />
      </Helmet>

      <ProfessorExamDetails />
    </ExamDetailsProvider>
  );
};

export default ExamDetailsPage;
