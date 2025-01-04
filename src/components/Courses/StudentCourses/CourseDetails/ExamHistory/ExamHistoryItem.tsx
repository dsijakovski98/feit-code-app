import { useMemo } from "react";

import SubmissionStatus from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/Misc/SubmissionStatus";
import Icon from "@/components/ui/Icon";

import { ExamHistory } from "@/hooks/student/useStudentExamHistory";
import { calculateGrade } from "@/utils/courses/grade";

type Props = {
  historyItem: ExamHistory[number];
  isLink?: boolean;
};

const ExamHistoryItem = ({ historyItem, isLink = false }: Props) => {
  const { exam, points, status } = historyItem;

  const examGrade = useMemo(
    () => (points ? calculateGrade({ totalPoints: exam.points, points }) : null),
    [points, exam.points],
  );

  return (
    <div className="flex flex-1 items-center justify-between gap-4 text-lg md:flex-wrap">
      <div className="*:leading-tight">
        <p className="flex items-start gap-1.5 font-semibold">
          <span>
            {exam.name}・{exam.language}
          </span>
          <span>{isLink && <Icon name="link" className="h-4 w-4" />}</span>
        </p>
        {examGrade && <p className="font-sans">Grade: {examGrade}</p>}
      </div>

      {examGrade ? (
        <p className="font-sans text-xl font-semibold">
          {points}/{exam.points}
        </p>
      ) : (
        <SubmissionStatus status={status!} />
      )}
    </div>
  );
};

export default ExamHistoryItem;
