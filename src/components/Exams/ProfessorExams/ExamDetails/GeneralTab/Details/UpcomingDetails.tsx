import { useMemo } from "react";

import DetailsHeader from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/Details/DetailsHeader";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { formatTimestamp } from "@/utils/dates";

const UpcomingDetails = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { startsAt, durationMinutes, points, tasks } = examDetails;

  const timestamp = useMemo(() => formatTimestamp(startsAt), [startsAt]);

  return (
    <div className="flex h-full flex-col justify-between space-y-8">
      <DetailsHeader>
        <p>Taking place</p>
        <time className="text-lg font-semibold">{timestamp}</time>
      </DetailsHeader>

      <div className="flex items-end justify-between *:basis-full">
        <div className="grid justify-center">
          <p className="text-5xl font-semibold">{durationMinutes}</p>
          <p>Minutes</p>
        </div>

        <div className="grid justify-center">
          <p className="text-5xl font-semibold">{tasks.length}</p>
          <p>Tasks</p>
        </div>

        <div className="grid justify-center">
          <p className="text-5xl font-semibold">{points}</p>
          <p>Points</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDetails;
