import { Link } from "react-router-dom";

import { Chip, Spinner } from "@nextui-org/react";

import Button from "@/components/ui/Button";

import { EXAM_STATUS } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useLatestExam } from "@/hooks/exam/useLatestExam";
import { useCtx } from "@/hooks/useCtx";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";
import { formatTimestamp } from "@/utils/dates";

const ActiveExam = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId } = courseDetails;

  const { data: exam, isLoading } = useLatestExam({ courseId });

  if (isLoading) {
    return (
      <div className="grid w-[18ch] place-items-center py-4">
        <Spinner />
      </div>
    );
  }

  if (exam === null || exam?.status === EXAM_STATUS.completed) {
    return <p className="text-lg font-semibold text-foreground-300">No active exams yet.</p>;
  }

  if (!exam) return null;

  const { name, language, startsAt, status } = exam;

  return (
    <div className="flex flex-col items-end gap-2">
      <Chip
        color={examStatusColor(status)}
        className="w-fit space-x-1 rounded-full px-2"
        classNames={{
          content: "text-sm font-bold text-primary-foreground",
        }}
      >
        {parseExamStatus(status)} exam
      </Chip>

      <div className="text-end">
        <p className="text-lg font-semibold">
          {name}・{language}
        </p>

        {exam.status === EXAM_STATUS.new && <p className="font-sans">{formatTimestamp(startsAt)}</p>}

        {exam.status === EXAM_STATUS.ongoing && (
          <Button
            as={Link}
            // @ts-expect-error NextUI not passing through 'as' props
            to={`${ROUTES.examSession}/${exam.id}`}
            className="mt-2 bg-secondary-foreground px-6 text-sm font-bold text-secondary"
          >
            Join now
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActiveExam;
