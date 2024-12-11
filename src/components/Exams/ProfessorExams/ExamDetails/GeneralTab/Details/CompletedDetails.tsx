import { useMemo } from "react";

import DetailsHeader from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/Details/DetailsHeader";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { simplePlural } from "@/utils";
import { formatTimestamp } from "@/utils/dates";

const CompletedDetails = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { startedAt, durationMinutes, points, submissions } = examDetails;

  const timestamp = useMemo(() => formatTimestamp(startedAt!), [startedAt]);

  return (
    <div className="flex h-full flex-col justify-between space-y-8">
      <DetailsHeader>
        <p>Took place on</p>
        <time className="text-lg font-semibold">{timestamp}</time>
      </DetailsHeader>

      <div className="flex items-end justify-between *:basis-full">
        <div className="grid justify-start">
          <p className="text-5xl font-semibold">{durationMinutes} min</p>
          <p>Duration</p>
        </div>

        <div className="grid justify-center">
          <p className="text-5xl font-semibold">{submissions.length}</p>
          <p>{simplePlural("Submission", submissions.length)}</p>
        </div>

        <div className="grid justify-end">
          <p className="text-5xl font-semibold">{points}</p>
          <p>Total Points</p>
        </div>
      </div>
    </div>
  );
};

export default CompletedDetails;
