import { useCallback, useState } from "react";

import { CircularProgress } from "@nextui-org/react";

import SessionsTable from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionsTable";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { MonitorExamProvider, MonitorSession } from "@/context/MonitorExamContext";
import { useDatabaseListen } from "@/hooks/firebase/useDatabaseListen";
import { useCtx } from "@/hooks/useCtx";
import { ExamStats } from "@/types/exams";

const MonitorTab = () => {
  const { examDetails } = useCtx(ExamDetailsContext);

  const [studentSessions, setStudentSessions] = useState<MonitorSession[] | null>(null);

  const onData = useCallback((examStats: ExamStats) => {
    const sessions: MonitorSession[] = [];

    Object.entries(examStats.activeStudents ?? {}).forEach(([sessionId, session]) =>
      sessions.push({ ...session, sessionId, status: session.removed ? "Removed" : "Active" }),
    );

    Object.entries(examStats.finishedStudents ?? {}).forEach(([sessionId, session]) =>
      sessions.push({ ...session, sessionId, status: "Finished" }),
    );

    setStudentSessions(sessions);
  }, []);

  useDatabaseListen(`exams/${examDetails.id}`, onData);

  if (!studentSessions) {
    return (
      <div className="grid h-full place-items-center p-10">
        <CircularProgress size="lg" aria-label="Loading exam sessions..." />
      </div>
    );
  }

  return (
    <MonitorExamProvider studentSessions={studentSessions}>
      <SessionsTable />
    </MonitorExamProvider>
  );
};

export default MonitorTab;
