import { useCallback, useState } from "react";

import { CircularProgress } from "@nextui-org/react";

import SessionsTable from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionsTable";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { MonitorExamProvider } from "@/context/MonitorExamContext";
import { useDatabaseListen } from "@/hooks/firebase/useDatabaseListen";
import { useCtx } from "@/hooks/useCtx";
import { ExamStats, StudentSession } from "@/types/exams";

const MonitorTab = () => {
  const { examDetails } = useCtx(ExamDetailsContext);

  const [studentSessions, setStudentSessions] = useState<StudentSession[] | null>(null);

  const onData = useCallback((examStats: ExamStats) => {
    const sessions: StudentSession[] = [];

    Object.values(examStats.activeStudents ?? {}).forEach((session) => sessions.push(session));
    Object.values(examStats.finishedStudents ?? {}).forEach((session) => sessions.push(session));

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
