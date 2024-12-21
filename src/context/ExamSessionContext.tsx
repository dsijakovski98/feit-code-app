import { PropsWithChildren, createContext, useCallback, useState } from "react";

import { ExamDetails } from "@/hooks/exam/useExamDetails";
import { useDatabaseListen } from "@/hooks/firebase/useDatabaseListen";
import { FCStudent } from "@/hooks/useFCUser";
import { UseState } from "@/types";
import { SessionStats } from "@/types/exams";

type TaskState = {
  code: string;
  output: string;
};

export type ExamSessionContext = {
  student: FCStudent;
  exam: ExamDetails;
  submittedTasksState: UseState<string[]>;
  tasksState: UseState<Record<string, TaskState>>;
  currentTaskState: UseState<ExamDetails["tasks"][number]>;
  sessionIdState: UseState<string | undefined>;
  stats: SessionStats | null;
};

export const ExamSessionContext = createContext<ExamSessionContext | null>(null);
ExamSessionContext.displayName = "ExamSessionContext";

type Props = Pick<ExamSessionContext, "student" | "exam"> & PropsWithChildren;

const ExamSessionProvider = ({ children, ...ctx }: Props) => {
  const currentTaskState = useState(ctx.exam.tasks[0]);
  const submittedTasksState = useState<string[]>([]);
  const sessionIdState = useState<string>();
  const [sessionId] = sessionIdState;

  const [stats, setStats] = useState<SessionStats | null>(null);

  const onData = useCallback((sessionStats: SessionStats | null) => {
    setStats(sessionStats);
  }, []);

  useDatabaseListen(`exams/${ctx.exam.id}/activeStudents/${sessionId}`, onData);

  const tasksState = useState(() => {
    return ctx.exam.tasks.reduce(
      (acc, task) => {
        const taskKey = `${sessionId}_${task.id}`;
        acc[task.id] = {
          code: sessionStorage.getItem(taskKey) || "",
          output: "",
        };
        return acc;
      },
      {} as Record<string, TaskState>,
    );
  });

  return (
    <ExamSessionContext.Provider
      value={{
        ...ctx,
        currentTaskState,
        submittedTasksState,
        tasksState,
        sessionIdState,
        stats,
      }}
    >
      {children}
    </ExamSessionContext.Provider>
  );
};

export default ExamSessionProvider;
