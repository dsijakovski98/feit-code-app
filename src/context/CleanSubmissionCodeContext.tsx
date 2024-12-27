import { PropsWithChildren, createContext } from "react";

import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCleanSubmission } from "@/hooks/submission/useCleanSubmission";
import { useCtx } from "@/hooks/useCtx";

type CleanSubmissionCodeContext = ReturnType<typeof useCleanSubmission>;

export const CleanSubmissionCodeContext = createContext<CleanSubmissionCodeContext | null>(null);

const CleanSubmissionCodeProvider = ({ children }: PropsWithChildren) => {
  const { activeTask, submission } = useCtx(GradeSubmissionContext);
  const { tests, code, functionName } = activeTask;
  const { exam } = submission;

  const testsAvailable = tests.length > 0;

  const query = useCleanSubmission({
    enabled: testsAvailable,
    code,
    language: exam.language,
    name: functionName,
  });

  return <CleanSubmissionCodeContext.Provider value={query}>{children}</CleanSubmissionCodeContext.Provider>;
};

export default CleanSubmissionCodeProvider;
