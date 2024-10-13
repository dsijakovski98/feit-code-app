import { useState } from "react";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";

import TaskTestPreview from "@/components/Exams/Forms/NewExamForm/TaskTests/TaskTestPreview";
import TaskTestForm from "@/components/Tasks/Forms/TaskTestForm";
import Button from "@/components/ui/Button";

import { ExamFormContext, TaskType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

const TaskTests = () => {
  const { formState, tasksState, stepState } = useCtx(ExamFormContext);
  const [{ language }] = formState;
  const [tasks] = tasksState;
  const [, setStep] = stepState;

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Tests</h3>
        <p>
          <span className="text-lg font-semibold">{language}</span> exams support automatic tests. Add one or
          more tests to any task.
        </p>
      </div>

      <div className="space-y-12">
        <ScrollShadow className="h-[400px] py-4">
          <Listbox
            variant="bordered"
            items={tasks}
            aria-label="Exam tasks list"
            classNames={{ list: "gap-4" }}
          >
            {/* {(task) => ( */}
            {tasks.map((task) => (
              <ListboxItem
                key={task.title}
                textValue={task.title}
                classNames={{ base: "rounded-md border-default-200", title: "px-2 py-1" }}
                onPress={() => setActiveTask(task)}
              >
                <TaskTestPreview task={task} />
              </ListboxItem>
            ))}
            {/* )} */}
          </Listbox>
        </ScrollShadow>

        <TaskTestForm task={activeTask} onClose={() => setActiveTask(null)} />

        <div className="flex items-center justify-between gap-6">
          <Button fullWidth size="lg" color="default" onPress={() => setStep("tasks")}>
            Back to Tasks
          </Button>
          <Button fullWidth size="lg" onPress={() => setStep("confirm")}>
            Continue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TaskTests;
