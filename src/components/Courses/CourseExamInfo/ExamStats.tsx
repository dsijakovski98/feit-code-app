import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Stat from "@/components/ui/Stat";

import { ExamStatus } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
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
    <div className="mt-auto space-y-4">
      <div className="flex content-end items-end justify-around gap-4">
        {Object.entries(stats).map(([stat, numExams]) => (
          <Stat key={stat} value={numExams} label={parseExamStatus(stat as ExamStatus)} />
        ))}
      </div>

      <Button
        as={Link}
        // @ts-expect-error NextUI not passing through 'as' props
        to={ROUTES.exams}
        size="lg"
        fullWidth
        color="default"
        variant="bordered"
        startContent={<Icon name="exam" className="h-6 w-6" />}
      >
        All Exams
      </Button>
    </div>
  );
};

export default ExamStats;
