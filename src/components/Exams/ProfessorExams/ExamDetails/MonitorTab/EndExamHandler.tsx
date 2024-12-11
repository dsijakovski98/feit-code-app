import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { endExam } from "@/actions/exams";
import { ROUTES } from "@/constants/routes";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCountdown } from "@/hooks/useCountdown";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const EndExamHandler = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId, name, startedAt, durationMinutes } = examDetails;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const finishDialog = useToggle();

  const targetDate = useMemo(
    () => dayjs(startedAt).add(durationMinutes, "minutes"),
    [startedAt, durationMinutes],
  );

  const { done } = useCountdown(targetDate);

  useEffect(() => {
    if (!done) return;
    if (finishDialog.open) return;

    finishDialog.toggleOn();
  }, [done, finishDialog]);

  const { mutate, isPending } = useMutation({
    mutationFn: endExam,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId }] }),
        queryClient.invalidateQueries({ queryKey: [{ name: "courses" }] }),
      ]);

      toast.success("Exam ended!");
      navigate(`${ROUTES.dashboard}${ROUTES.exams}/${examId}`, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    mutate(examId);
  };

  return (
    <ConfirmDialog
      color="primary"
      cancelable={false}
      loading={isPending}
      dialog={finishDialog}
      title={`${name} has ended!`}
      description={`Finish this exam and start the grading process.`}
      action={{ label: "Finish", onConfirm }}
    />
  );
};

export default EndExamHandler;
