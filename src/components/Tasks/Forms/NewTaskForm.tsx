import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";

import { Textarea } from "@nextui-org/react";

import Input from "@/components/ui/Input";

import { ExamFormContext } from "@/context/ExamFormContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { baseTaskTemplate } from "@/utils/code";
import { TaskSchema } from "@/utils/formSchemas/tasks/taskSchema";

type Props = {
  form: UseFormReturn<TaskSchema>;
  dialog: Toggle;
  taskTemplate: string;
};

const NewTaskForm = ({ form, taskTemplate, dialog }: Props) => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { formState, tasksState, remainingPoints } = useCtx(ExamFormContext);
  const [{ language }] = formState;
  const [tasks, setTasks] = tasksState;

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TaskSchema> = (task) => {
    const { title, description } = task;
    const taskExists = tasks.find((task) => task.title === title);

    if (taskExists) {
      setError("title", { message: `"${title}" already exists` });
      return;
    }

    const template = taskTemplate.length ? taskTemplate : baseTaskTemplate({ title, description, language });

    setTasks((prev) => [...prev, { ...task, template }]);
    dialog.toggleOff();
  };

  return (
    <form id="new-task-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="grid grid-cols-[3fr_1fr] grid-rows-1 items-center gap-6 lg:contents">
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
                base: "grow",
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
            classNames={{
              label: "text-lg font-semibold !text-foreground lg:text-base",
            }}
          />
        )}
      />
    </form>
  );
};

export default NewTaskForm;
