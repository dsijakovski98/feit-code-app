import { PropsWithChildren, createContext, useState } from "react";
import toast from "react-hot-toast";

import { ExamFormContext, TestType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { UseState } from "@/types";
import { baseTaskTemplate } from "@/utils/code";
import { TaskSchema } from "@/utils/schemas/tasks/taskSchema";

export type TaskFormStep = "task" | "ask-tests" | "define-tests" | "add-tests" | "finish";

type TaskFormContext = {
  formState: UseState<TaskSchema>;
  stepState: UseState<TaskFormStep>;
  testsState: UseState<TestType[]>;

  createTask: () => void;
};

export const TaskFormContext = createContext<TaskFormContext | null>(null);
TaskFormContext.displayName = "TaskFormContext";

type Props = Pick<TaskFormContext, "stepState"> & { taskDialog: Toggle } & PropsWithChildren;

const TaskFormProvider = ({ stepState, taskDialog, children }: Props) => {
  const [, setTaskStep] = stepState;

  const { formState: examFormState, tasksState } = useCtx(ExamFormContext);
  const [{ language }] = examFormState;
  const [, setTasks] = tasksState;

  const formState = useState<TaskSchema>({
    title: "Test Task",
    description: "Some description here whatever",
    points: "100",
  });

  const testsState = useState<TestType[]>([]);

  const createTask = () => {
    setTaskStep("finish");

    setTimeout(() => {
      const [task, setTask] = formState;
      const { title, description } = task;
      const template = baseTaskTemplate({ title, description, language });

      const [tests, setTests] = testsState;
      setTasks((prev) => [...prev, { ...task, template, tests }]);

      // Reset everything
      setTests([]);
      setTaskStep("task");
      setTask({ title: "", description: "", points: "" });

      taskDialog.toggleOff();
      toast.success("Added a new task!");
    }, 200); // Timeout to wait for the progress to fill out
  };

  return (
    <TaskFormContext.Provider value={{ formState, stepState, testsState, createTask }}>
      {children}
    </TaskFormContext.Provider>
  );
};

export default TaskFormProvider;
