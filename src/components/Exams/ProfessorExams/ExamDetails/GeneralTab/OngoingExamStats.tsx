import { useState } from "react";

import Stat from "@/components/ui/Stat";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useDatabaseListen } from "@/hooks/firebase/useDatabaseListen";
import { useCtx } from "@/hooks/useCtx";
import type { ExamStats } from "@/types/exams";

const OngoingExamStats = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id } = examDetails;

  const [examStats, setExamStats] = useState<Record<keyof ExamStats, number>>({
    activeStudents: 0,
    finishedStudents: 0,
  });

  useDatabaseListen<ExamStats>(`exams/${id}`, (stats) => {
    if (!stats) return;

    setExamStats({
      activeStudents: Object.keys(stats.activeStudents).length,
      finishedStudents: Object.keys(stats.finishedStudents).length,
    });
  });
  return (
    <div className="flex items-end justify-start gap-20">
      <Stat badge size="sm" value={examStats.activeStudents} label="Active" />
      <Stat badge size="sm" value={examStats.finishedStudents} label="Finished" />
    </div>
  );
};

export default OngoingExamStats;
