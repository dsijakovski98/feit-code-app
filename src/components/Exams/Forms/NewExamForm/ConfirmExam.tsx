import { useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Divider } from "@nextui-org/react";

import Button from "@/components/ui/Button";

import { createExam } from "@/actions/exams";
import { ROUTES } from "@/constants/routes";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { parseDateTime } from "@/utils/dates";

const ConfirmExam = () => {
  const {
    courseDetails: { id: courseId },
  } = useCtx(CourseDetailsContext);
  const { formState, tasksState, stepState } = useCtx(ExamFormContext);

  const [exam] = formState;
  const { name, durationMinutes, language, points, startDate, startTime } = exam;

  const [tasks] = tasksState;
  const [, setStep] = stepState;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { date, time } = useMemo(() => parseDateTime(startDate, startTime), [startDate, startTime]);

  const { mutate, isPending } = useMutation({
    mutationFn: createExam,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "exams" }] }),
        queryClient.invalidateQueries({ queryKey: [{ name: "latest-exam", courseId }] }),
      ]);

      toast.success(`${language} exam "${name}" created!`);
      navigate(`${ROUTES.dashboard}${ROUTES.courses}/${courseId}`);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleCreateExam = () => {
    setStep("creating");
    mutate({ courseId, exam, tasks });
  };

  return (
    <section className="space-y-16">
      <div className="space-y-6">
        <h2 className="text-3xl">
          {name}・{language}
        </h2>

        <div className="flex items-center justify-between gap-6">
          <div className="text-lg">
            <p>Start date/time</p>

            <p className="text-xl font-semibold">
              {date} at {time}
            </p>
          </div>

          <div className="text-end text-lg">
            <p>Time limit</p>
            <p className="text-xl font-semibold">{durationMinutes} minutes</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <ul className="space-y-4">
          {tasks.map(({ title, description, points }) => (
            <li key={title} className="flex items-end justify-between gap-6">
              <div>
                <p className="text-lg font-semibold">{title}</p>
                <p>{description}</p>
              </div>

              <p className="text-xl font-semibold">{points} points</p>
            </li>
          ))}
        </ul>

        <Divider className="!h-px" />

        <div className="flex items-center justify-between gap-6 text-xl font-semibold">
          <p>Total</p>
          <p>{points} points</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <Button fullWidth size="lg" color="default" isDisabled={isPending} onPress={() => setStep("tasks")}>
          Go back
        </Button>
        <Button fullWidth size="lg" isLoading={isPending} onPress={handleCreateExam}>
          Create Exam
        </Button>
      </div>
    </section>
  );
};

export default ConfirmExam;
