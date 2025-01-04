import { Fragment, useMemo, useState } from "react";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import AddTaskForm from "@/components/Tasks/Forms/AddTaskForm";
import TaskPreview from "@/components/Tasks/TaskPreview";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext, TaskType } from "@/context/ExamFormContext";
import TaskPreviewProvider from "@/context/TaskPreviewContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const ExamTasks = () => {
  const { stepState, tasksState, remainingPoints } = useCtx(ExamFormContext);
  const [, setStep] = stepState;
  const [tasks] = tasksState;

  const taskDialog = useToggle();

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const tasksAdded = useMemo(() => remainingPoints === 0, [remainingPoints]);
  const showPointsLeft = useMemo(() => tasks.length > 0 && !tasksAdded, [tasks.length, tasksAdded]);

  const pointsLeftMessage = useMemo(
    () => `${remainingPoints} point${remainingPoints !== 1 && "s"} left`,
    [remainingPoints],
  );

  return (
    <Fragment>
      <section className="space-y-6">
        <div className="flex h-[50px] items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-xl font-semibold">
            <h3>Tasks</h3>
            {showPointsLeft && (
              <p>
                ・<span className="text-warning">{pointsLeftMessage}</span>
              </p>
            )}
          </div>

          <PresenceBlock mode="appear" show={tasks.length > 0}>
            <Button
              color="default"
              variant="light"
              isDisabled={remainingPoints <= 0}
              startContent={<Icon name="add" className="h-5 w-5" />}
              className="pl-3 text-sm"
              onPress={taskDialog.toggleOn}
            >
              Add Task
            </Button>
          </PresenceBlock>
        </div>

        <div className="space-y-12">
          <ScrollShadow className="h-[400px] py-4">
            <Listbox
              variant="bordered"
              items={tasks}
              aria-label="Exam tasks list"
              classNames={{ list: "gap-4" }}
              emptyContent={
                <div className="grid place-items-center space-y-4 text-center">
                  <p className="text-lg font-semibold text-foreground-300">
                    This exam has no tasks yet, add as many as you need
                  </p>

                  <Button
                    color="default"
                    startContent={<Icon name="add" className="h-5 w-5" />}
                    className="pl-3 lg:text-sm"
                    onPress={taskDialog.toggleOn}
                  >
                    Add Task
                  </Button>
                </div>
              }
            >
              {tasks.map((task, index) => (
                <ListboxItem
                  key={task.title}
                  textValue={task.title}
                  classNames={{ base: "rounded-md border-default-200", title: "px-2 py-1" }}
                  onPress={() => setActiveTask(task)}
                >
                  <TaskPreviewProvider
                    task={task}
                    index={index}
                    open={activeTask?.title === task.title}
                    onClose={() => setActiveTask(null)}
                  >
                    <TaskPreview />
                  </TaskPreviewProvider>
                </ListboxItem>
              ))}
            </Listbox>
          </ScrollShadow>

          <PresenceBlock show={tasksAdded}>
            <Button fullWidth size="lg" isDisabled={!tasksAdded} onPress={() => setStep("confirm")}>
              Continue
            </Button>
          </PresenceBlock>
        </div>
      </section>

      <AddTaskForm dialog={taskDialog} />
    </Fragment>
  );
};

export default ExamTasks;
