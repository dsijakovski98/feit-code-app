import { useState } from "react";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";

import AddTask from "@/components/Exams/Forms/NewExamForm/ExamTasks/AddTask";
import TaskPreview from "@/components/Tasks/TaskPreview";
import Button from "@/components/ui/Button";

import { ExamFormContext, TaskType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

const ExamTasks = () => {
  const { formState, stepState, tasksState, remainingPoints } = useCtx(ExamFormContext);
  const [examForm] = formState;
  const [, setStep] = stepState;
  const [tasks] = tasksState;

  const totalPoints = Number(examForm.points);

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-1 text-lg font-semibold">
          <h3>Tasks</h3>
          {remainingPoints < totalPoints && <p>・ Points left: {remainingPoints}</p>}
        </div>

        {tasks.length > 0 && <AddTask variant="light" color="default" />}
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
                  classNames={{ base: "rounded-md border-default-200", title: "px-2" }}
                  onPress={() => setActiveTask(task)}
                >
                  {/* TODO: Maybe add DND for reordering */}
                  <TaskPreview
                    task={task}
                    index={index}
                    open={activeTask?.title === task.title}
                    onClose={() => setActiveTask(null)}
                  />
                </ListboxItem>
              ))}
            </Listbox>
          </ScrollShadow>

          <div className="relative">
            {remainingPoints > 0 && (
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
