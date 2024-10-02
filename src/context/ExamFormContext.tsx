import { PropsWithChildren, createContext, useMemo, useState } from "react";

import { PROGRAMMING_LANGUAGE } from "@/constants/enums";
import { UseState } from "@/types";
import { ExamSchema } from "@/utils/formSchemas/exams/examSchema";
import { TaskSchema } from "@/utils/formSchemas/tasks/taskSchema";

type ExamFormContext = {
  formState: UseState<ExamSchema>;
  tasksState: UseState<TaskSchema[]>;
  remainingPoints: number;
  stepState: UseState<"exam" | "tasks" | "end">;
};

export const ExamFormContext = createContext<ExamFormContext | null>(null);
ExamFormContext.displayName = "ExamFormContext";

const ExamFormProvider = ({ children }: PropsWithChildren) => {
  const formState = useState<ExamSchema>({
    name: "",
    language: PROGRAMMING_LANGUAGE.javascript,
    durationMinutes: "",
    points: "",
  });

  const tasksState = useState<TaskSchema[]>([]);

  const stepState = useState<"exam" | "tasks" | "end">("exam");

  const [examForm] = formState;
  const [tasks] = tasksState;

  const totalPoints = Number(examForm.points);
  const remainingPoints = useMemo(() => {
    const tasksPoints = tasks.reduce((acc, task) => acc + Number(task.points), 0);

    return totalPoints - tasksPoints;
  }, [totalPoints, tasks]);

  return (
    <ExamFormContext.Provider value={{ formState, tasksState, stepState, remainingPoints }}>
      {children}
    </ExamFormContext.Provider>
  );
};

export default ExamFormProvider;
