import { FormEvent, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Input from "@/components/ui/Input";

import { addFeedback } from "@/actions/grades";
import { ROUTES } from "@/constants/routes";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { Toggle } from "@/hooks/useToggle";
import { feedbackKey } from "@/utils";
import { FeedbackSchema, createFeedbackSchema } from "@/utils/schemas";

const formId = "feedback-points";

type Props = {
  dialog: Toggle;
  feedback: string;
};

const SubmitFeedback = ({ dialog, feedback }: Props) => {
  const { submission } = useCtx(GradeSubmissionContext);
  const { exam, student } = submission;

  const { userData } = useFCUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const feedbackSchema = useMemo(() => createFeedbackSchema(exam.tasks), [exam.tasks]);
  const {
    control,
    getValues,
    handleSubmit,
    clearErrors,
    setError,
    formState: { isSubmitting },
  } = useForm<FeedbackSchema>({
    resolver: valibotResolver(feedbackSchema),
    defaultValues: {
      ...exam.tasks.reduce(
        (acc, task) => {
          acc[task.title] = "";
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  });

  const [totalPoints, setTotalPoints] = useState(0);

  const onChange = (e: FormEvent) => {
    e.preventDefault();

    const totalPts: number[] = [];

    exam.tasks.forEach((task) => {
      const val = Number(getValues(task.title)) || 0;
      clearErrors(task.title);

      if (val > task.points!) {
        setError(task.title, { message: `Max ${task.points} pts` });
      }

      totalPts.push(val);
    });

    setTotalPoints(totalPts.reduce((acc, pts) => acc + pts, 0));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addFeedback,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId: exam.id }] });

      localStorage.removeItem(feedbackKey(submission.id));
      toast.success(`Submitted feedback for ${student.firstName}'s task!`);
      navigate(`${ROUTES.exams}/${exam.id}#results`, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  const submitFeedback: SubmitHandler<FeedbackSchema> = () => {
    if (!userData) return;

    mutate({
      submissionId: submission.id,
      graderId: userData.user.id,
      rawFeedback: feedback,
      points: totalPoints,
    });
  };

  const loading = isSubmitting || isPending;

  return (
    <ConfirmDialog
      dialog={dialog}
      loading={loading}
      color="primary"
      title="Submit feedback?"
      formId={formId}
      description={
        <div className="relative space-y-6">
          <p>Assign points for each task before submitting your feedback:</p>
          <form id={formId} onSubmit={handleSubmit(submitFeedback)} onChange={onChange}>
            {exam.tasks.map((task, idx) => (
              <div key={task.title} className="flex items-center gap-2">
                <Controller
                  control={control}
                  name={task.title}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      size="md"
                      type="number"
                      color="default"
                      variant="underlined"
                      inputMode="numeric"
                      autoFocus={idx === 0}
                      max={task.points ?? 0}
                      label={task.title}
                      isDisabled={isSubmitting}
                      isInvalid={fieldState.invalid}
                      errorMessage={fieldState.error?.message}
                      classNames={{
                        base: "max-w-[10ch] group",
                        errorMessage: "font-sans",
                        input: "text-lg translate-y-1.5",
                        label: "text-base !truncate !max-w-[12ch] group-hover:!max-w-fit",
                      }}
                    />
                  )}
                />
                <div className="contents text-lg font-semibold text-foreground-300">
                  <span>/</span>
                  <span>{task.points} pts</span>
                </div>
              </div>
            ))}
          </form>

          <div className="absolute bottom-6 right-0 text-lg">
            Total: <span className="font-semibold">{totalPoints} pts</span>
          </div>
        </div>
      }
      action={{ label: "Submit" }}
    />
  );
};

export default SubmitFeedback;
