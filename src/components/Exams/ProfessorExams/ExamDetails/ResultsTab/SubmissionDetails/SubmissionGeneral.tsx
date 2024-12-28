import { useMemo } from "react";
import { Link } from "react-router-dom";

import { User } from "@nextui-org/user";

import SubmissionStatus from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/Misc/SubmissionStatus";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { ExamDetails } from "@/hooks/exam/useExamDetails";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { formatTimestamp, parseDuration } from "@/utils/dates";
import { submissionStatusDescription } from "@/utils/exams/results";
import { gradeExamHref } from "@/utils/exams/sessions";

type Props = {
  submission: ExamDetails["submissions"][number];
};

const SubmissionGeneral = ({ submission }: Props) => {
  const { student, examId, studentId, status } = submission;

  const { examDetails } = useCtx(ExamDetailsContext);

  const [avatarUrl, isLoading] = useAvatar(student.id);

  const gradeHref = useMemo(() => gradeExamHref(examId, studentId), [examId, studentId]);

  const sessionDuration = useMemo(() => {
    if (!submission) return null;
    if (!examDetails.startedAt) return null;

    return parseDuration({ start: examDetails.startedAt, end: submission?.submittedAt });
  }, [submission, examDetails.startedAt]);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">General</h3>

      <div className="flex items-start gap-6">
        {submission && (
          <div className="mr-auto">
            <User
              name={`${student.firstName} ${student.lastName}`}
              description={student.email}
              avatarProps={{
                size: "lg",
                src: avatarUrl ?? "",
                showFallback: isLoading,
              }}
              classNames={{
                name: "text-base font-semibold",
                description: "text-sm",
              }}
            />
          </div>
        )}

        {status === SUBMISSION_STATUS.graded ? (
          <p className="self-center font-sans text-3xl font-semibold">
            {submission.points} / {examDetails.points} pts
          </p>
        ) : (
          <Button
            as={Link}
            // @ts-expect-error NextUI not passing through 'as' props
            to={gradeHref}
            startContent={<Icon name="grade" className="h-6 w-6" />}
            className="px-8"
          >
            Grade Student
          </Button>
        )}
      </div>

      {submission && (
        <div className="flex items-center gap-12">
          <div className="mr-auto space-y-1">
            <SubmissionStatus status={submission.status!} />
            <p>{submissionStatusDescription(submission.status!)}</p>
          </div>

          <div>
            <p className="text-sm">Submitted On</p>
            <p className="text-xl font-semibold">{formatTimestamp(submission?.submittedAt || "")}</p>
          </div>

          {sessionDuration && (
            <div>
              <p className="text-sm">Session Duration</p>
              <p className="text-xl font-semibold">{sessionDuration}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionGeneral;
