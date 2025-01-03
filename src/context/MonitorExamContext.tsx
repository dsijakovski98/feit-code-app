import { PropsWithChildren, createContext } from "react";

import { StudentSession } from "@/types/exams";

export type SessionStatus = "Active" | "Finished" | "Removed";

export type MonitorSession = StudentSession & {
  sessionId: string;
  status: SessionStatus;
};

type MonitorExamContext = {
  studentSessions: MonitorSession[];
};

export const MonitorExamContext = createContext<MonitorExamContext | null>(null);
MonitorExamContext.displayName = "MonitorExamContext";

type Props = MonitorExamContext & PropsWithChildren;

export const MonitorExamProvider = ({ children, ...ctx }: Props) => {
  return <MonitorExamContext.Provider value={ctx}>{children}</MonitorExamContext.Provider>;
};
