import { Fragment } from "react";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";

import AddTask from "@/components/Exams/Forms/NewExamForm/ExamTasks/AddTask";
import TaskPreview from "@/components/Exams/Forms/NewExamForm/ExamTasks/TaskPreview";
import Button from "@/components/ui/Button";

import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

const ExamTasks = () => {
  const { formState, stepState, tasksState, remainingPoints } = useCtx(ExamFormContext);
  const [examForm] = formState;
  const [, setStep] = stepState;
  const [tasks] = tasksState;

  const totalPoints = Number(examForm.points);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <h3>Tasks</h3>
          {remainingPoints < totalPoints && <p>・ Points left: {remainingPoints}</p>}
        </div>

        <AddTask />
      </div>

      {tasks.length === 0 && (
        <div className="space-y-4 text-center">
          <p className="font-semibold text-foreground-300">This exam has no tasks yet, let's add one.</p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground-300">or</p>
            <Button size="sm" color="default" onPress={() => setStep("exam")} className="px-4 text-xs">
              Back
            </Button>
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <Fragment>
          <ScrollShadow className="h-[400px]">
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
                >
                  <TaskPreview task={task} index={index} />
                </ListboxItem>
              ))}
            </Listbox>
          </ScrollShadow>

          <div className="flex items-center justify-between gap-4">
            <Button fullWidth color="default" onPress={() => setStep("exam")}>
              Back
            </Button>

            <Button fullWidth isDisabled={remainingPoints > 0} onPress={() => setStep("end")}>
              Continue
            </Button>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default ExamTasks;
