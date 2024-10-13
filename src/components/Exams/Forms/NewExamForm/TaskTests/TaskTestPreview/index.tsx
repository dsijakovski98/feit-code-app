import Icon from "@/components/ui/Icon";

import { TaskType } from "@/context/ExamFormContext";

type Props = {
  task: TaskType;
};

const TaskTestPreview = ({ task }: Props) => {
  const { title, description } = task;
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-base text-foreground-300">{description}</p>
      </div>
      <Icon name="test" className="h-6 w-6 translate-y-1.5" />
    </div>
  );
};

export default TaskTestPreview;
