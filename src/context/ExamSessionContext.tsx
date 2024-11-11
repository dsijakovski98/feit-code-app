import { PropsWithChildren, createContext, useState } from "react";

import { ExamDetails } from "@/hooks/exam/useExamDetails";
import { FCStudent } from "@/hooks/useFCUser";
import { UseState } from "@/types";

type ExamSessionContext = {
  student: FCStudent;
  exam: ExamDetails;
  tasksCodeState: UseState<Record<string, string>>;
};

export const ExamSessionContext = createContext<ExamSessionContext | null>(null);

type Props = Pick<ExamSessionContext, "student" | "exam"> & PropsWithChildren;

const ExamSessionProvider = ({ children, ...ctx }: Props) => {
  const tasksCodeState = useState(() => {
    return ctx.exam.tasks.reduce(
      (acc, task) => {
        console.log(task.title, sessionStorage.getItem(task.id));
        acc[task.id] = sessionStorage.getItem(task.id) || "";

        return acc;
      },
      {} as Record<string, string>,
    );
  });

  return (
    <ExamSessionContext.Provider value={{ ...ctx, tasksCodeState }}>{children}</ExamSessionContext.Provider>
  );
};

export default ExamSessionProvider;
