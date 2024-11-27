import { PropsWithChildren, createContext, useState } from "react";

import { ExamDetails } from "@/hooks/exam/useExamDetails";
import { FCStudent } from "@/hooks/useFCUser";
import { UseState } from "@/types";

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
};

export const ExamSessionContext = createContext<ExamSessionContext | null>(null);

type Props = Pick<ExamSessionContext, "student" | "exam"> & PropsWithChildren;

const ExamSessionProvider = ({ children, ...ctx }: Props) => {
  const currentTaskState = useState(ctx.exam.tasks[0]);
  const submittedTasksState = useState<string[]>([]);

  const tasksState = useState(() => {
    return ctx.exam.tasks.reduce(
      (acc, task) => {
        acc[task.id] = {
          code: sessionStorage.getItem(task.id) || "",
          output: "",
        };
        return acc;
      },
      {} as Record<string, TaskState>,
    );
  });

  return (
    <ExamSessionContext.Provider value={{ ...ctx, currentTaskState, submittedTasksState, tasksState }}>
      {children}
    </ExamSessionContext.Provider>
  );
};

export default ExamSessionProvider;
