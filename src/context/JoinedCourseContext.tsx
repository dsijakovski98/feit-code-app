import { PropsWithChildren, createContext } from "react";

import { JoinedCourse } from "@/hooks/student/useStudentJoinedCourse";

type JoinedCourseContext = {
  joinedData: JoinedCourse;
};

export const JoinedCourseContext = createContext<JoinedCourseContext | null>(null);

type Props = JoinedCourseContext & PropsWithChildren;

const JoinedCourseProvider = ({ children, ...ctx }: Props) => {
  return <JoinedCourseContext.Provider value={ctx}>{children}</JoinedCourseContext.Provider>;
};

export default JoinedCourseProvider;
