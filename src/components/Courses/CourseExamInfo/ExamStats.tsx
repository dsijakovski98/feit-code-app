import { Spinner } from "@nextui-org/react";

import Stat from "@/components/ui/Stat";

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
        <Stat key={stat} value={numExams} label={parseExamStatus(stat as ExamStatus)} />
      ))}
    </div>
  );
};

export default ExamStats;
