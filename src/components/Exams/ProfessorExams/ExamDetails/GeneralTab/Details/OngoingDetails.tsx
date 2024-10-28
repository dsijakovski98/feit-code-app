import { useMemo } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import OngoingExamStats from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/OngoingExamStats";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import Icon from "@/components/ui/Icon";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const OngoingDetails = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { durationMinutes, startedAt } = examDetails;

  const targetDate = useMemo(
    () => dayjs(startedAt).add(durationMinutes, "minutes"),
    [startedAt, durationMinutes],
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-2xl font-semibold">Exam started!</h2>

        <Button
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to="#monitor"
          variant="light"
          color="default"
          startContent={<Icon name="monitor" className="h-6 w-6" />}
          className="text-sm"
        >
          Monitor Exam
        </Button>
      </div>

      <div className="flex items-end justify-between gap-6">
        <OngoingExamStats />

        <div className="text-end">
          <Countdown targetDate={targetDate} className="justify-end text-4xl font-semibold" />
          <p>Time Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default OngoingDetails;
