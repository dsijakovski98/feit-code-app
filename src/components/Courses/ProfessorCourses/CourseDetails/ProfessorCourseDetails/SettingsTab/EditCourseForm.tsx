import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

import { Textarea } from "@nextui-org/react";

import { courseCategories, courses } from "@/db/schema";

import AssistantSelect from "@/components/Courses/Forms/AssistantSelect";
import CategorySelect from "@/components/Courses/Forms/CategorySelect";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { db } from "@/db";
import { useCtx } from "@/hooks/useCtx";
import { USER_TYPE } from "@/types";
import { CourseSchema } from "@/utils/formSchemas/courses/courseSchema";

const EditCourseForm = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { isMobile } = useCtx(ResponsiveContext);

  const queryClient = useQueryClient();

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
      assistantId: courseDetails.assistantId ?? "",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CourseSchema> = async ({ name, description, categories, assistantId }) => {
    clearErrors("root");

    try {
      const [{ courseId }] = await db
        .update(courses)
        .set({
          name,
          description,
          assistantId: assistantId || null,
        })
        .where(eq(courses.id, courseDetails.id))
        .returning({ courseId: courses.id });

      await db.delete(courseCategories).where(eq(courseCategories.courseId, courseId));

      if (categories.length > 0) {
        const categoryIds = categories.split(",");

        await db.insert(courseCategories).values(categoryIds.map((categoryId) => ({ categoryId, courseId })));
      }

      const { professorId } = courseDetails;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "courses", courseId }], exact: true }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: USER_TYPE.professor, id: professorId }],
        }),
      ]);

      toast.success("Updated course details!");
    } catch (e) {
      // TODO: Sentry logging
      console.log({ e });

      const message = "Failed to update course details!";
      toast.error(message);
      setError("root", { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h3 className="font-semibold">Update course details</h3>

      <div className="-space-y-2">
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

      <CategorySelect
        form={form}
        defaultValue={defaultCategories.length ? defaultCategories.split(",") : []}
      />

      <Button
        fullWidth
        size={isMobile ? "md" : "lg"}
        type="submit"
        className="!mt-10"
        isLoading={isSubmitting}
      >
        Confirm
      </Button>
    </form>
  );
};

export default EditCourseForm;
