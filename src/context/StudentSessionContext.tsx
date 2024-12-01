import { PropsWithChildren, createContext } from "react";

import { StudentSession } from "@/types/exams";

type StudentSessionContext = {
  session: StudentSession;
};

export const StudentSessionContext = createContext<StudentSessionContext | null>(null);

type Props = StudentSessionContext & PropsWithChildren;

export const StudentSessionProvider = ({ children, ...ctx }: Props) => {
  return <StudentSessionContext.Provider value={ctx}>{children}</StudentSessionContext.Provider>;
};
