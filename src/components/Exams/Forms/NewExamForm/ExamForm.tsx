import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import ScheduleExam from "../ScheduleExam";
import { valibotResolver } from "@hookform/resolvers/valibot";

import DurationSelect from "@/components/Exams/Forms/DurationSelect";
import ProgrammingLanguageSelect from "@/components/Exams/Forms/ProgrammingLanguageSelect";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ExamFormContext } from "@/context/ExamFormContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { getAcademicYear, getSemesterType } from "@/utils";
import { ExamSchema } from "@/utils/formSchemas/exams/examSchema";

const academicYear = getAcademicYear();
const semester = getSemesterType();

const ExamForm = () => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name } = courseDetails;

  const { formState, stepState } = useCtx(ExamFormContext);
  const [examForm, setExamForm] = formState;
  const [, setStep] = stepState;

  const form = useForm<ExamSchema>({
    resolver: valibotResolver(ExamSchema),
    defaultValues: examForm,
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ExamSchema> = (formData) => {
    const totalPoints = Number(formData.points);

    if (totalPoints <= 0) {
      setError("points", { message: "At least 1 point required!" });
      return;
    }

    setExamForm(formData);
    setStep("tasks");
  };

  const namePlaceholder = useMemo(() => `Ex. ${name} | ${semester} Semester ${academicYear}`, [name]);

  return (
    <form id="new-exam-form" onSubmit={handleSubmit(onSubmit)} className="space-y-14 lg:pb-4">
      <div className="space-y-4">
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
              label="Exam name"
              placeholder={namePlaceholder}
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className="flex items-center justify-between gap-6 pb-6 *:basis-full lg:contents">
          <ScheduleExam form={form} />

          <DurationSelect form={form} />
        </div>

        <div className="flex items-start justify-between gap-6 *:basis-full lg:contents">
          <ProgrammingLanguageSelect form={form} />

          <Controller
            control={control}
            name="points"
            disabled={isSubmitting}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size="lg"
                type="number"
                color="default"
                variant="underlined"
                inputMode="numeric"
                label="Total Points"
                isDisabled={isSubmitting}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 *:basis-full lg:contents">
        <Button size="lg" fullWidth type="submit" className="transition-size">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ExamForm;
