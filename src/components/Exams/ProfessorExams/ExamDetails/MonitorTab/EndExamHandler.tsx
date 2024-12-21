import { useEffect, useMemo } from "react";

import dayjs from "dayjs";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { MonitorExamContext } from "@/context/MonitorExamContext";
import { useEndExam } from "@/hooks/exam/useEndExam";
import { useCountdown } from "@/hooks/useCountdown";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const EndExamHandler = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId, name, startedAt, durationMinutes } = examDetails;

  const { studentSessions } = useCtx(MonitorExamContext);

  const finishDialog = useToggle();

  const activeSessionsRemaining = useMemo(
    () => studentSessions.some((session) => session.status === "Active"),
    [studentSessions],
  );

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

  const { mutate, isPending } = useEndExam({ examId });

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
      description={
        activeSessionsRemaining
          ? `There are still students that haven't finished.`
          : "Finish this exam and start the grading process."
      }
      action={{ label: activeSessionsRemaining ? "Finish anyway" : "Finish", onConfirm }}
    />
  );
};

export default EndExamHandler;
