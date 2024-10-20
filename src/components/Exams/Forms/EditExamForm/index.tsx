import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import DurationSelect from "@/components/Exams/Forms/DurationSelect";
import ScheduleExam from "@/components/Exams/Forms/ScheduleExam";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { updateExam } from "@/actions/exams";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useExamNamePlaceholder } from "@/hooks/exam/useExamNamePlaceholder";
import { useCtx } from "@/hooks/useCtx";
import { USER_TYPE } from "@/types";
import { ExamSchema } from "@/utils/schemas/exams/examSchema";

const EditExamForm = () => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { examDetails } = useCtx(ExamDetailsContext);

  const {
    name,
    language,
    points,
    durationMinutes,
    startsAt,
    id: examId,
    courseId,
    course: { professorId },
  } = examDetails;

  const queryClient = useQueryClient();

  const form = useForm<ExamSchema>({
    resolver: valibotResolver(ExamSchema),
    defaultValues: {
      name,
      language,
      points: points.toString(),
      durationMinutes: durationMinutes.toString(),
      startDate: dayjs(startsAt).toDate(),
      startTime: dayjs(startsAt).toDate(),
    },
  });

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const namePlaceholder = useExamNamePlaceholder(name);

  const onSubmit: SubmitHandler<ExamSchema> = async ({ name, durationMinutes, startDate, startTime }) => {
    clearErrors("root");

    try {
      await updateExam({ examId, name, durationMinutes, startDate, startTime });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId }], exact: true }),
        queryClient.invalidateQueries({ queryKey: [{ name: "exam-stats", courseId }] }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "exams", type: USER_TYPE.professor, id: professorId, courseId }],
        }),
      ]);

      toast.success("Exam details updated!");
    } catch (e) {
      // TODO: Sentry logging
      console.log({ e });

      const message = "Failed to update exam!";
      toast.error(message);
      setError("root", { message: message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 lg:space-y-3">
        <div className="flex items-baseline gap-6 md:contents">
          <Controller
            control={control}
            name="name"
            disabled={isSubmitting}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                autoFocus
                fullWidth
                size={isMobile ? "md" : "lg"}
                color="default"
                variant="underlined"
                label="Exam name"
                placeholder={namePlaceholder}
                isDisabled={isSubmitting}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                className="grow"
              />
            )}
          />

          <div className="lg:min-w-auto min-w-[240px] shrink">
            <DurationSelect form={form} />
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-6">
          <ScheduleExam form={form} />
        </div>
      </div>

      <div className="mt-10">
        <Button fullWidth type="submit" isLoading={isSubmitting}>
          Edit Exam
        </Button>
      </div>
    </form>
  );
};

export default EditExamForm;
