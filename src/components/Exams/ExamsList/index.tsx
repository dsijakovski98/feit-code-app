import { Fragment } from "react";

import { Spinner } from "@nextui-org/react";

import ExamCard from "@/components/Exams/ExamCard";
import ExamsListSwiper from "@/components/Exams/ExamsList/List";
import EmptyExamsList from "@/components/Exams/Misc/EmptyExamsList";

import { useExams } from "@/hooks/exam/useExams";
import { UserType } from "@/types";

type Props = {
  userId: string;
  type: UserType;
  selectedCourseId: string;
  status: string;
  course: string;
};

const ExamsList = ({ userId, type, selectedCourseId, status, course }: Props) => {
  const query = useExams({
    userId,
    type,
    status,
    courseId: selectedCourseId,
  });
  const { data: exams, isPending } = query;

  return (
    <Fragment>
      {isPending && (
        <div className="w-full py-8 text-center">
          <Spinner size="lg" />
        </div>
      )}

      {exams?.pages[0].length === 0 && <EmptyExamsList status={status} course={course} />}

      {!!exams?.pages[0].length && (
        <section className="overflow-x-clip">
          <ExamsListSwiper examsQuery={query} renderExam={(exam) => <ExamCard exam={exam} />} />
        </section>
      )}
    </Fragment>
  );
};

export default ExamsList;
