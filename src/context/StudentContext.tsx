import { PropsWithChildren, createContext } from "react";

import { InferSelectModel } from "drizzle-orm";

import { students } from "@/db/schema";

type StudentContext = {
  student: InferSelectModel<typeof students>;
  joinedAt: string;
};

export const StudentContext = createContext<StudentContext | null>(null);
StudentContext.displayName = "StudentContext";

type Props = StudentContext & PropsWithChildren;

const StudentProvider = ({ children, ...ctx }: Props) => {
  return <StudentContext.Provider value={ctx}>{children}</StudentContext.Provider>;
};

export default StudentProvider;
