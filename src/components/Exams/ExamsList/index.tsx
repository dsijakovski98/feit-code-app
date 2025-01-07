import { Fragment, useMemo } from "react";

import { Spinner } from "@nextui-org/spinner";

import ExamCard from "@/components/Exams/ExamCard";
import ExamsListSwiper from "@/components/Exams/ExamsList/List";
import EmptyExamsList from "@/components/Exams/Misc/EmptyExamsList";

import { useExams } from "@/hooks/exam/useExams";
import { UserType } from "@/types";

type Props = {
  userId: string;
  type: UserType;

  selectedCourseId: "all" | (string & {});
  courseIds: string[];

  status: string;
  course: string;
};

const ExamsList = ({ userId, type, selectedCourseId, courseIds, status, course }: Props) => {
  const selectedCourseIds = useMemo(
    () => (selectedCourseId === "all" ? courseIds : [selectedCourseId]),
    [courseIds, selectedCourseId],
  );

  const query = useExams({ userId, type, status, selectedCourseIds });
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
