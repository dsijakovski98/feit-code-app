import { PropsWithChildren, createContext } from "react";

import { ExamDetails } from "@/hooks/exam/useExamDetails";
import { useTaskTemplate } from "@/hooks/task/useTaskTemplate";

type ExamSessionTaskContext = {
  task: ExamDetails["tasks"][number];
  isLoading: boolean;
  template?: string;
};

export const ExamSessionTaskContext = createContext<ExamSessionTaskContext | null>(null);

type Props = Pick<ExamSessionTaskContext, "task"> & PropsWithChildren;

export const ExamSessionTaskProvider = ({ task, children }: Props) => {
  const { data: template, isLoading } = useTaskTemplate(task.templateUrl);

  return (
    <ExamSessionTaskContext.Provider value={{ task, template, isLoading }}>
      {children}
    </ExamSessionTaskContext.Provider>
  );
};
