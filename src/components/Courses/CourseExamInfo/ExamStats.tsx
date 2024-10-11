import { Spinner } from "@nextui-org/react";

import { ExamStatus } from "@/constants/enums";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCourseExamStats } from "@/hooks/exam/useCourseExamStats";
import { useCtx } from "@/hooks/useCtx";
import { parseExamStatus } from "@/utils";

const ExamStats = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id } = courseDetails;
  const { data: stats, isLoading } = useCourseExamStats(id);

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="mt-auto flex content-end items-end justify-around gap-4">
      {Object.entries(stats).map(([stat, numExams]) => (
        <div key={stat}>
          <p className="text-6xl font-bold">{numExams > 9 ? "9+" : numExams}</p>
          <p>{parseExamStatus(stat as ExamStatus)}</p>
        </div>
      ))}
    </div>
  );
};

export default ExamStats;
