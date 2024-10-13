import { Suspense, lazy, useMemo } from "react";
import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/spinner";

import ExamStats from "@/components/Courses/CourseExamInfo/ExamStats";
import Button from "@/components/ui/Button";
import FloatButton from "@/components/ui/FloatButton";
import Icon from "@/components/ui/Icon";

import { EXAM_STATUS } from "@/constants/enums";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useLatestExam } from "@/hooks/exam/useLatestExam";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

const CompletedExamInfo = lazy(
  () => import("@/components/Courses/CourseExamInfo/ExamInfo/CompletedExamInfo"),
);
const OngoingExamInfo = lazy(() => import("@/components/Courses/CourseExamInfo/ExamInfo/OngoingExamInfo"));
const UpcomingExamInfo = lazy(() => import("@/components/Courses/CourseExamInfo/ExamInfo/UpcomingExamInfo"));

const CourseExamInfo = () => {
  const { userData } = useFCUser();
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId, professorId } = courseDetails;

  const { data: exam, isLoading } = useLatestExam({ courseId });

  const isCourseProfessor = useMemo(() => userData?.user.id === professorId, [userData, professorId]);

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

        {isCourseProfessor && (
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
        )}
      </div>
    );
  }

  if (!exam) return null;

  const { status } = exam;

  return (
    <div className="flex h-full flex-col justify-start gap-6 md:gap-20">
      <Suspense fallback={null}>
        {status === EXAM_STATUS.new && <UpcomingExamInfo exam={exam} />}
        {status === EXAM_STATUS.ongoing && <OngoingExamInfo exam={exam} />}
        {status === EXAM_STATUS.completed && <CompletedExamInfo exam={exam} />}
      </Suspense>

      <ExamStats />

      {isCourseProfessor && (
        <FloatButton
          as={Link}
          icon="add"
          // @ts-expect-error NextUI not passing through 'as' props
          to="new-exam"
          containerClass="bottom-10 right-10 lg:bottom-20 lg:right-5"
        >
          New Exam
        </FloatButton>
      )}
    </div>
  );
};

export default CourseExamInfo;
