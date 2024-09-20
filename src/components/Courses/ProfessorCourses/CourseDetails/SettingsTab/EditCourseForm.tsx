import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Textarea } from "@nextui-org/react";

import AssistantSelect from "@/components/Courses/Forms/AssistantSelect";
import CategorySelect from "@/components/Courses/Forms/CategorySelect";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { CourseSchema } from "@/utils/formSchemas/courses/courseSchema";

const EditCourseForm = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { isMobile } = useCtx(ResponsiveContext);

  const defaultCategories = useMemo(
    () => courseDetails.categories.map(({ categoryId }) => categoryId).join(","),
    [courseDetails.categories],
  );

  const form = useForm<CourseSchema>({
    resolver: valibotResolver(CourseSchema),
    defaultValues: {
      name: courseDetails.name,
      description: courseDetails.description ?? "",
      categories: defaultCategories,
      assistantId: courseDetails.assistantId ?? undefined,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CourseSchema> = async () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size={isMobile ? "md" : "lg"}
              color="default"
              variant="underlined"
              label="Course name"
              placeholder="What's this course called?"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              size={isMobile ? "md" : "lg"}
              minRows={isMobile ? 2 : 3}
              color="default"
              variant="underlined"
              label="Description (optional)"
              placeholder="Short summary of the course's content"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-lg font-semibold !text-foreground lg:text-base",
              }}
            />
          )}
        />
      </div>

      <AssistantSelect form={form} defaultValue={courseDetails.assistantId ?? undefined} />

      <CategorySelect form={form} defaultValue={defaultCategories.split(",")} />

      <Button
        fullWidth
        size={isMobile ? "md" : "lg"}
        type="submit"
        className="!mt-10"
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
      >
        Confirm
      </Button>
    </form>
  );
};

export default EditCourseForm;
