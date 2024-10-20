import { PropsWithChildren, createContext, useState } from "react";
import toast from "react-hot-toast";

import { ExamFormContext, TestType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { UseState } from "@/types";
import { TaskSchema } from "@/utils/formSchemas/tasks/taskSchema";

export type TaskFormStep = "task" | "ask-tests" | "define-tests" | "add-tests" | "finish";

type TaskFormContext = {
  formState: UseState<TaskSchema>;
  stepState: UseState<TaskFormStep>;
  templateState: UseState<string>;
  testsState: UseState<TestType[]>;

  createTask: () => void;
};

export const TaskFormContext = createContext<TaskFormContext | null>(null);
TaskFormContext.displayName = "TaskFormContext";

type Props = Pick<TaskFormContext, "stepState"> & { taskDialog: Toggle } & PropsWithChildren;

const TaskFormProvider = ({ stepState, taskDialog, children }: Props) => {
  const [, setTaskStep] = stepState;

  const { tasksState } = useCtx(ExamFormContext);
  const [, setTasks] = tasksState;

  const formState = useState<TaskSchema>({
    title: "Test Task",
    description: "Some description here whatever",
    points: "100",
  });

  const templateState = useState("");
  const testsState = useState<TestType[]>([]);

  const createTask = () => {
    setTaskStep("finish");

    setTimeout(() => {
      const [task, setTask] = formState;
      const [tests, setTests] = testsState;
      const [template, setTemplate] = templateState;
      setTasks((prev) => [...prev, { ...task, template, tests }]);

      // Reset everything
      setTests([]);
      setTemplate("");
      setTaskStep("task");
      setTask({ title: "", description: "", points: "" });

      taskDialog.toggleOff();
      toast.success("Added a new task!");
    }, 200); // Timeout to wait for the progress to fill out
  };

  return (
    <TaskFormContext.Provider value={{ formState, stepState, templateState, testsState, createTask }}>
      {children}
    </TaskFormContext.Provider>
  );
};

export default TaskFormProvider;
