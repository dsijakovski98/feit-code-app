import { PropsWithChildren, createContext } from "react";

import { ExamDetails } from "@/hooks/exam/useExamDetails";

type ExamDetailsContext = {
  examDetails: ExamDetails;
};

export const ExamDetailsContext = createContext<ExamDetailsContext | null>(null);
ExamDetailsContext.displayName = "ExamDetailsContext";

type Props = ExamDetailsContext & PropsWithChildren;

const ExamDetailsProvider = ({ examDetails, children }: Props) => {
  return <ExamDetailsContext.Provider value={{ examDetails }}>{children}</ExamDetailsContext.Provider>;
};

export default ExamDetailsProvider;
