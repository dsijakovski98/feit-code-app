import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Textarea } from "@nextui-org/react";

import Input from "@/components/ui/Input";

import { ExamFormContext } from "@/context/ExamFormContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { TaskFormContext } from "@/context/TaskFormContext";
import { useCtx } from "@/hooks/useCtx";
import { TaskSchema } from "@/utils/schemas/tasks/taskSchema";

const NewTaskForm = () => {
  const { isMobile } = useCtx(ResponsiveContext);

  const { tasksState, remainingPoints } = useCtx(ExamFormContext);
  const [tasks] = tasksState;

  const { formState: taskFormState, stepState: taskStepState } = useCtx(TaskFormContext);
  const [taskForm, setTaskForm] = taskFormState;
  const [, setTaskStep] = taskStepState;

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TaskSchema>({
    resolver: valibotResolver(TaskSchema),
    defaultValues: taskForm,
  });

  const onSubmit: SubmitHandler<TaskSchema> = (task) => {
    const { title } = task;
    const taskExists = tasks.find((task) => task.title === title);

    if (taskExists) {
      setError("title", { message: `"${title}" already exists` });
      return;
    }

    setTaskForm(task);
    setTaskStep("ask-tests");
  };

  return (
    <form id="new-task-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-6 lg:contents lg:!gap-8">
        <Controller
          control={control}
          name="title"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size={isMobile ? "md" : "lg"}
              color="default"
              variant="underlined"
              label="Title"
              placeholder="Short name/summary of the task"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                base: "basis-[70%]",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              size={isMobile ? "md" : "lg"}
              minRows={isMobile ? 3 : 4}
              color="default"
              variant="underlined"
              label="Description"
              placeholder="Detailed description of the task's requirements"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              className="order-1 lg:mb-8"
              classNames={{
                label: "text-lg font-semibold !text-foreground lg:text-base",
                errorMessage: "text-sm",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="points"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              size={isMobile ? "md" : "lg"}
              type="number"
              color="default"
              variant="underlined"
              inputMode="numeric"
              label="Points"
              max={remainingPoints}
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid || Number(field.value) > remainingPoints}
              errorMessage={fieldState.error?.message}
              classNames={{ base: "basis-[26%] lg:max-w-[150px]" }}
              description={
                <span className="text-xs">
                  <span className="font-sans font-semibold">
                    {remainingPoints} point
                    {remainingPoints > 1 ? "s" : ""}
                  </span>{" "}
                  left
                </span>
              }
            />
          )}
        />
      </div>
    </form>
  );
};

export default NewTaskForm;
