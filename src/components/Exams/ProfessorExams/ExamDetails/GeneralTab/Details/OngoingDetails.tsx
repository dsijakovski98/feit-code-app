import { useMemo } from "react";

import dayjs from "dayjs";

import Countdown from "@/components/ui/Countdown";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const OngoingDetails = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { durationMinutes } = examDetails;

  const targetDate = useMemo(
    // TODO: Update to correct target date after flow is done
    // () => dayjs(startedAt).add(durationMinutes, "minutes"),
    // [startedAt, durationMinutes],
    () => dayjs().add(durationMinutes, "minutes"),
    [durationMinutes],
  );

  return (
    <div className="h-full">
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-2xl font-semibold">Exam is Ongoing...</h2>

        <div className="text-end">
          <Countdown targetDate={targetDate} className="justify-end text-2xl font-semibold" />
          <p className="text-sm">Time Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default OngoingDetails;
