import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Spinner } from "@nextui-org/spinner";

import GradeSubmission from "@/components/GradeSubmission";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { updateSubmissionGrading } from "@/actions/grades";
import { SUBMISSION_STATUS } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
import GradeSubmissionProvider from "@/context/GradeSubmissionContext";
import { useSubmissionDetails } from "@/hooks/submission/useSubmissionDetails";

const GradeStudentPage = () => {
  const { id: examId = "", sid: studentId = "" } = useParams<{ id: string; sid: string }>();

  const { data: submission, error, isLoading } = useSubmissionDetails({ examId, studentId });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateSubmissionGrading,
    onSuccess: (success) => {
      if (!success) return;

      queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId: submission?.examId }] });
    },
  });

  useEffect(() => {
    if (submission?.status === SUBMISSION_STATUS.submitted) {
      mutate({ submissionId: submission.id });
    }
  }, [submission?.status, mutate, submission?.id]);

  if (error) {
    const submissionNotFound = !!error.message.match(/submission not found/i);

    const errorHref = submissionNotFound
      ? `${ROUTES.dashboard}${ROUTES.exams}/${examId}#results`
      : ROUTES.exams;

    const errorLabel = submissionNotFound ? "Back to Results" : "Back to Exams";

    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <h2 className="text-2xl font-medium text-danger">{error.message}</h2>
        <Button
          variant="light"
          color="default"
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to={errorHref}
          className="text-base"
          startContent={<Icon name="left" className="h-5 w-5" />}
        >
          {errorLabel}
        </Button>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <Spinner size="lg" className="scale-150" />
      </section>
    );
  }

  if (!submission) {
    return null;
  }

  if (submission.status === SUBMISSION_STATUS.graded) {
    return <Navigate to={`${ROUTES.dashboard}${ROUTES.exams}/${examId}#results`} replace />;
  }

  return (
    <GradeSubmissionProvider submission={submission}>
      <GradeSubmission />
    </GradeSubmissionProvider>
  );
};

export default GradeStudentPage;
