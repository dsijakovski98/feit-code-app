import { Fragment } from "react";

import { Spinner } from "@nextui-org/react";

import ExamCard from "@/components/Exams/ExamCard";
import ExamsList from "@/components/Exams/ExamsList";
import EmptyExamsList from "@/components/Exams/Misc/EmptyExamsList";

import { useExams } from "@/hooks/exam/useExams";
import { USER_TYPE } from "@/types";

type Props = {
  studentId: string;
  selectedCourseId: string;
  status: string;
  course: string;
};

const StudentExamsList = ({ studentId, selectedCourseId, status, course }: Props) => {
  const query = useExams({
    userId: studentId,
    type: USER_TYPE.student,
    courseId: selectedCourseId,
    status,
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
          <ExamsList examsQuery={query} renderExam={(exam) => <ExamCard exam={exam} />} />
        </section>
      )}
    </Fragment>
  );
};

export default StudentExamsList;
