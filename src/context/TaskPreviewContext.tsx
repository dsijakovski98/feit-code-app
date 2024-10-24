import { PropsWithChildren, createContext } from "react";

import { TaskType } from "@/context/ExamFormContext";

type TaskPreviewContext = {
  open: boolean;
  onClose: () => void;
  task: TaskType;
  index: number;
};

export const TaskPreviewContext = createContext<TaskPreviewContext | null>(null);
TaskPreviewContext.displayName = "TaskPreviewContext";

type Props = TaskPreviewContext & PropsWithChildren;

const TaskPreviewProvider = ({ children, ...rest }: Props) => {
  return <TaskPreviewContext.Provider value={rest}>{children}</TaskPreviewContext.Provider>;
};

export default TaskPreviewProvider;
