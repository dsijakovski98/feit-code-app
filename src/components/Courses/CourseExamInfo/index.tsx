import { Link } from "react-router-dom";

import { Chip, Spinner } from "@nextui-org/react";

import CompletedExamInfo from "@/components/Courses/CourseExamInfo/CompletedExamInfo";
import NewExamInfo from "@/components/Courses/CourseExamInfo/NewExamInfo";
import OngoingExamInfo from "@/components/Courses/CourseExamInfo/OngoingExamInfo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { EXAM_STATUS } from "@/constants/enums";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useLatestExam } from "@/hooks/exam/useLatestExam";
import { useCtx } from "@/hooks/useCtx";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";

const CourseExamInfo = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId } = courseDetails;

  const { data: exam, isLoading } = useLatestExam({ courseId });

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (exam === null) {
    return (
      <div className="grid h-full place-items-center content-center gap-3">
        <p className="font-semibold text-foreground-300">You don't have an upcoming exam yet.</p>

        <Button
          size="sm"
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to="new-exam"
          startContent={<Icon name="add" className="h-4 w-4" />}
          className="text-xs"
        >
          New exam
        </Button>
      </div>
    );
  }

  if (!exam) return null;

  const { name, language, status } = exam;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold">
            {name}・{language}
          </h2>
          <p>Latest Exam</p>
        </div>

        <Chip size="lg" classNames={{ content: "font-semibold" }} color={examStatusColor(status)}>
          {parseExamStatus(status)} exam
        </Chip>
      </div>

      {status === EXAM_STATUS.new && <NewExamInfo exam={exam} />}

      {status === EXAM_STATUS.ongoing && <OngoingExamInfo exam={exam} />}

      {status === EXAM_STATUS.completed && <CompletedExamInfo exam={exam} />}
    </div>
  );
};

export default CourseExamInfo;
