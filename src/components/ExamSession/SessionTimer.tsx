import { Fragment, useEffect, useMemo } from "react";

import dayjs from "dayjs";

import { CircularProgress, CircularProgressProps } from "@nextui-org/react";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Icon from "@/components/ui/Icon";
import TimeLeft from "@/components/ui/TimeLeft";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useCountdown } from "@/hooks/useCountdown";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const SessionTimer = () => {
  const { exam } = useCtx(ExamSessionContext);
  const { durationMinutes, startedAt } = exam;

  const doneDialog = useToggle();

  const targetDate = useMemo(
    () => dayjs(startedAt).add(durationMinutes, "minutes"),
    [startedAt, durationMinutes],
  );

  const { countdown, secondsRemaining, done } = useCountdown(targetDate);

  const progress = useMemo(() => {
    const durationSeconds = durationMinutes * 60;
    const secondsPassed = durationSeconds - secondsRemaining;

    return (secondsPassed / durationSeconds) * 100;
  }, [secondsRemaining, durationMinutes]);

  const progressColor = useMemo<CircularProgressProps["color"]>(() => {
    if (progress > 80) return "danger";

    if (progress > 50) return "warning";

    return "success";
  }, [progress]);

  const onConfirm = () => {
    // TODO: Finish exam
    doneDialog.toggleOff();
  };

  useEffect(() => {
    if (!done) return;
    if (doneDialog.open) return;

    doneDialog.toggleOn();
  }, [done, doneDialog]);

  return (
    <Fragment>
      <div className="group relative isolate">
        <CircularProgress
          value={progress}
          color={progressColor}
          aria-label="Exam time remaining"
          className="scale-110"
        />
        <Icon
          name="alarm"
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-95"
        />

        <div className="absolute left-full top-1/2 -z-10 -translate-y-1/2 whitespace-nowrap">
          {done ? (
            <p className="translate-x-4 text-lg font-semibold">Time's up!</p>
          ) : (
            <TimeLeft
              countdown={countdown}
              className="opacity-0 transition-transform-opacity *:text-lg group-hover:translate-x-4 group-hover:opacity-100"
            />
          )}
        </div>
      </div>

      {/* TODO: Finish dialog here */}
      <ConfirmDialog
        color="primary"
        cancelable={false}
        dialog={doneDialog}
        title={`Time's up!`}
        description={`Don't worry, your progress so far will be saved.`}
        action={{ label: "Finish Exam", onConfirm }}
      />
    </Fragment>
  );
};

export default SessionTimer;