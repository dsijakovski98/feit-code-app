import { PropsWithChildren, createContext, useMemo, useState } from "react";

import { SubmissionDetails } from "@/hooks/submission/useSubmissionDetails";
import { UseState } from "@/types";

type Outputs = Record<string, string>;

type GradeSubmissionContext = {
  submission: SubmissionDetails;

  activeTask: SubmissionDetails["exam"]["tasks"][number];
  activeOutput: string;

  setOutputs: UseState<Outputs>[1];
  setActiveId: UseState<string>[1];
};

export const GradeSubmissionContext = createContext<GradeSubmissionContext | null>(null);
GradeSubmissionContext.displayName = "GradeSubmissionContext";

type Props = Pick<GradeSubmissionContext, "submission"> & PropsWithChildren;

const GradeSubmissionProvider = ({ children, ...ctx }: Props) => {
  const { exam } = ctx.submission;
  const [activeId, setActiveId] = useState(exam.tasks[0].id);

  const activeTask = useMemo(() => exam.tasks.find((task) => task.id === activeId)!, [activeId, exam.tasks]);

  const [outputs, setOutputs] = useState(() => {
    return ctx.submission.exam.tasks.reduce(
      (acc, task) => {
        acc[task.id] = "";

        return acc;
      },
      {} as Record<string, string>,
    );
  });

  const activeOutput = useMemo(() => outputs[activeTask.id], [outputs, activeTask]);

  return (
    <GradeSubmissionContext.Provider value={{ ...ctx, activeTask, activeOutput, setOutputs, setActiveId }}>
      {children}
    </GradeSubmissionContext.Provider>
  );
};

export default GradeSubmissionProvider;
