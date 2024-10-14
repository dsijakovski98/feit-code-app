import { useMemo, useState } from "react";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";

import AddTask from "@/components/Exams/Forms/NewExamForm/ExamTasks/AddTask";
import TaskPreview from "@/components/Tasks/TaskPreview";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext, TaskType } from "@/context/ExamFormContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import TaskPreviewProvider from "@/context/TaskPreviewContext";
import { useCtx } from "@/hooks/useCtx";
import { supportsTests } from "@/utils/code";

const ExamTasks = () => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { formState, stepState, tasksState, remainingPoints } = useCtx(ExamFormContext);
  const [, setStep] = stepState;
  const [tasks] = tasksState;
  const [{ language }] = formState;

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const testsSupported = useMemo(() => supportsTests(language), [language]);
  const tasksAdded = useMemo(() => remainingPoints === 0, [remainingPoints]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-xl font-semibold">
          <h3>Tasks</h3>
          <p>・ Points left: {remainingPoints}</p>
        </div>

        {tasks.length > 0 &&
          (testsSupported ? (
            <div>
              <PresenceBlock mode="appear" show={!tasksAdded}>
                <AddTask variant="light" color="default" />
              </PresenceBlock>

              <PresenceBlock mode="appear" show={tasksAdded}>
                <Button
                  variant="light"
                  color="default"
                  size={isMobile ? "md" : "lg"}
                  onPress={() => setStep("tests")}
                  startContent={<Icon name="test" className="!h-5 !w-5 shrink-0" />}
                  className="w-[136px] pl-5 lg:text-sm"
                >
                  Add Tests
                </Button>
              </PresenceBlock>
            </div>
          ) : (
            <AddTask variant="light" color="default" />
          ))}
      </div>

      {tasks.length === 0 && (
        <div className="grid place-items-center space-y-4 text-center">
          <p className="text-lg font-semibold text-foreground-300">
            This exam has no tasks yet, add as many as you need
          </p>

          <AddTask color="default" size="md" />
        </div>
      )}

      {tasks.length > 0 && (
        <div className="space-y-12">
          <ScrollShadow className="h-[400px] py-4">
            <Listbox
              variant="bordered"
              items={tasks}
              aria-label="Exam tasks list"
              classNames={{ list: "gap-4" }}
            >
              {tasks.map((task, index) => (
                <ListboxItem
                  key={task.title}
                  textValue={task.title}
                  classNames={{ base: "rounded-md border-default-200", title: "px-2 py-1" }}
                  onPress={() => setActiveTask(task)}
                >
                  {/* TODO: Maybe add DND for reordering */}
                  <TaskPreviewProvider
                    task={task}
                    index={index}
                    open={!!activeTask}
                    onClose={() => setActiveTask(null)}
                  >
                    <TaskPreview />
                  </TaskPreviewProvider>
                </ListboxItem>
              ))}
            </Listbox>
          </ScrollShadow>

          <div className="relative">
            {!tasksAdded && (
              <p className="absolute bottom-full -translate-y-1 font-semibold text-warning-600 dark:text-warning-300">
                {remainingPoints} points left to distribute to Tasks
              </p>
            )}
            <Button fullWidth size="lg" isDisabled={remainingPoints > 0} onPress={() => setStep("confirm")}>
              Continue
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExamTasks;
