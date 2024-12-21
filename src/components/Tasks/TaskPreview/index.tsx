import { Fragment } from "react";

import { Tooltip } from "@nextui-org/tooltip";

import TaskPreviewModal from "@/components/Tasks/TaskPreview/TaskPreviewModal";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamFormContext } from "@/context/ExamFormContext";
import { TaskPreviewContext } from "@/context/TaskPreviewContext";
import { useCtx } from "@/hooks/useCtx";

const TaskPreview = () => {
  const { task, index } = useCtx(TaskPreviewContext);
  const { title, points } = task;

  const { tasksState } = useCtx(ExamFormContext);
  const [tasks, setTasks] = tasksState;

  const move = (direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === tasks.length - 1) return;

    setTasks((prev) => {
      const idx = prev.findIndex((task) => task.title === title);

      if (idx === -1) return prev;

      prev.splice(idx, 1);

      const newIndex = direction === "up" ? idx - 1 : idx + 1;
      prev.splice(newIndex, 0, task);

      return [...prev];
    });
  };

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            <span className="font-sans">{index + 1}.</span> {title}
          </p>
          <p className="text-base">
            <span className="font-sans font-semibold">{points}</span> points
          </p>
        </div>

        <div className="flex items-center gap-1">
          <div className="-space-y-1 *:!scale-80 [&_button]:flex">
            <Tooltip content="Move up" delay={500} classNames={{ content: "font-serif" }}>
              <Button
                isIconOnly
                size="sm"
                aria-label="Move up"
                color="default"
                variant="light"
                radius="full"
                isDisabled={index === 0}
                onPress={() => move("up")}
              >
                <Icon name="up" className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="Move down" delay={500} classNames={{ content: "font-serif" }}>
              <Button
                isIconOnly
                size="sm"
                aria-label="Move down"
                color="default"
                variant="light"
                radius="full"
                isDisabled={index === tasks.length - 1}
                onPress={() => move("down")}
              >
                <Icon name="down" className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <TaskPreviewModal />
    </Fragment>
  );
};

export default TaskPreview;
