import { PropsWithChildren, createContext } from "react";

import { ExamDetails } from "@/hooks/exam/useExamDetails";

type ExamSubmissionContext = {
  submission: ExamDetails["submissions"][number];
};

export const ExamSubmissionContext = createContext<ExamSubmissionContext | null>(null);
ExamSubmissionContext.displayName = "ExamSubmissionContext";

type Props = ExamSubmissionContext & PropsWithChildren;

const ExamSubmissionProvider = ({ children, ...ctx }: Props) => {
  return <ExamSubmissionContext.Provider value={ctx}>{children}</ExamSubmissionContext.Provider>;
};

export default ExamSubmissionProvider;
