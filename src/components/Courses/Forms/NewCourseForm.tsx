import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";
import { Textarea } from "@nextui-org/input";

import { courseCategories, courses } from "@/db/schema";

import AssistantSelect from "@/components/Courses/Forms/AssistantSelect";
import CategorySelect from "@/components/Courses/Forms/CategorySelect";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { db } from "@/db";
import { useCtx } from "@/hooks/useCtx";
import { getAcademicYear } from "@/utils";
import { CourseSchema } from "@/utils/schemas/courses/courseSchema";

const NewCourseForm = () => {
  const { userId } = useAuth();
  const { isMobile } = useCtx(ResponsiveContext);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const academicYear = useMemo(() => getAcademicYear(), []);

  const form = useForm<CourseSchema>({
    resolver: valibotResolver(CourseSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: "",
      assistantId: "",
    },
  });

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CourseSchema> = async ({ name, description, categories, assistantId }) => {
    if (!userId) return;

    clearErrors("root");

    try {
      const [{ courseId }] = await db
        .insert(courses)
        .values({
          name,
          description,
          academicYear,
          professorId: userId,
          assistantId: assistantId || undefined,
        })
        .returning({ courseId: courses.id });

      if (categories.length > 0) {
        const categoryIds = categories.split(",");

        await db.insert(courseCategories).values(categoryIds.map((categoryId) => ({ categoryId, courseId })));
      }

      await queryClient.invalidateQueries({ queryKey: [{ name: "courses" }] });

      navigate(ROUTES.courses);
      toast.success(`You created a new course "${name}"!`);
    } catch (e) {
      // Sentry logging
      console.log({ e });
      const message = `Failed to create a new course!`;

      setError("root", { message });
      toast.error(message);
    }
  };

  return (
    <form id="new-course-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:pb-4">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold">Create a new Course</h2>
        <p className="text-foreground-300 lg:text-sm">
          You will be teaching this course for the <span className="font-semibold">{academicYear}</span>{" "}
          semester
        </p>
      </div>

      <div>
        <Controller
          control={control}
          name="name"
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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

      <AssistantSelect form={form} />

      <CategorySelect form={form} />

      <Button
        fullWidth
        size={isMobile ? "md" : "lg"}
        type="submit"
        className="!mt-10"
        isLoading={isSubmitting}
      >
        Create Course
      </Button>
    </form>
  );
};

export default NewCourseForm;
