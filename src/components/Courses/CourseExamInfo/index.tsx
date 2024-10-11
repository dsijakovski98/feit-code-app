import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/spinner";

import CompletedExamInfo from "@/components/Courses/CourseExamInfo/CompletedExamInfo";
import ExamStats from "@/components/Courses/CourseExamInfo/ExamStats";
import NewExamInfo from "@/components/Courses/CourseExamInfo/NewExamInfo";
import OngoingExamInfo from "@/components/Courses/CourseExamInfo/OngoingExamInfo";
import Button from "@/components/ui/Button";
import FloatButton from "@/components/ui/FloatButton";
import Icon from "@/components/ui/Icon";

import { EXAM_STATUS } from "@/constants/enums";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useLatestExam } from "@/hooks/exam/useLatestExam";
import { useCtx } from "@/hooks/useCtx";

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
          New Exam
        </Button>
      </div>
    );
  }

  if (!exam) return null;

  const { status } = exam;

  return (
    <div className="flex h-full flex-col justify-start gap-6">
      {status === EXAM_STATUS.new && <NewExamInfo exam={exam} />}

      {status === EXAM_STATUS.ongoing && <OngoingExamInfo exam={exam} />}

      {status === EXAM_STATUS.completed && <CompletedExamInfo exam={exam} />}

      <ExamStats />

      <FloatButton
        as={Link}
        icon="add"
        // @ts-expect-error NextUI not passing through 'as' props
        to="new-exam"
        containerClass="bottom-10 right-10 lg:bottom-20 lg:right-5"
      >
        New Exam
      </FloatButton>
    </div>
  );
};

export default CourseExamInfo;
