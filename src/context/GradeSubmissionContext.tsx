import { PropsWithChildren, createContext } from "react";

import { SubmissionDetails } from "@/hooks/student/useStudentSubmissionDetails";

type GradeSubmissionContext = {
  submission: SubmissionDetails;
};

export const GradeSubmissionContext = createContext<GradeSubmissionContext | null>(null);
GradeSubmissionContext.displayName = "GradeSubmissionContext";

type Props = GradeSubmissionContext & PropsWithChildren;

const GradeSubmissionProvider = ({ children, ...ctx }: Props) => {
  return <GradeSubmissionContext.Provider value={ctx}>{children}</GradeSubmissionContext.Provider>;
};

export default GradeSubmissionProvider;
