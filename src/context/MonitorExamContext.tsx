import { PropsWithChildren, createContext } from "react";

import { StudentSession } from "@/types/exams";

type MonitorExamContext = {
  studentSessions: StudentSession[];
};

export const MonitorExamContext = createContext<MonitorExamContext | null>(null);

type Props = MonitorExamContext & PropsWithChildren;

export const MonitorExamProvider = ({ children, ...ctx }: Props) => {
  return <MonitorExamContext.Provider value={ctx}>{children}</MonitorExamContext.Provider>;
};
