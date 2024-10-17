import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { ScrollShadow } from "@nextui-org/react";

import TaskTestPreview from "@/components/Exams/Forms/NewExamForm/TaskTests/TaskTestPreview";
import Button from "@/components/ui/Button";

import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

const TaskTests = () => {
  const { formState, tasksState, stepState } = useCtx(ExamFormContext);
  const [{ language }] = formState;
  const [tasks] = tasksState;
  const [, setStep] = stepState;

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Tests</h3>
        <p className="text-lg">
          <span className="font-semibold">{language}</span> exams support automatic tests. Click on any Task
          to add a Test to it.
        </p>
      </div>

      <div className="space-y-12">
        <ScrollShadow className="h-[400px] py-4 pr-2">
          <Accordion
            variant="light"
            aria-label="Exam tasks list"
            className="rounded-md border border-foreground/20 px-4 dark:border-content2"
          >
            {tasks.map((task) => (
              <AccordionItem
                key={task.title}
                title={task.title}
                classNames={{
                  base: "!border-transparent",
                  title: "text-lg font-semibold",
                  indicator: "text-foreground",
                }}
              >
                <TaskTestPreview task={task} />
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollShadow>

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
