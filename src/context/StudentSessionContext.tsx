import { PropsWithChildren, createContext } from "react";

import { MonitorSession } from "@/context/MonitorExamContext";

type StudentSessionContext = {
  session: MonitorSession;
};

export const StudentSessionContext = createContext<StudentSessionContext | null>(null);

type Props = StudentSessionContext & PropsWithChildren;

export const StudentSessionProvider = ({ children, ...ctx }: Props) => {
  return <StudentSessionContext.Provider value={ctx}>{children}</StudentSessionContext.Provider>;
};
