import { useCallback, useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import { handleSessionTimeOff } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useCtx } from "@/hooks/useCtx";

export const useExamTimeOff = () => {
  const {
    sessionIdState,
    exam: { id: examId },
  } = useCtx(ExamSessionContext);
  const [sessionId] = sessionIdState;

  const [startTime, setStartTime] = useState<Dayjs>();

  const handleWindowFocus = useCallback(() => {
    if (!startTime) return;
    if (!sessionId) return;

    const timeOff = dayjs().diff(startTime, "seconds");

    if (timeOff > 0) {
      handleSessionTimeOff({ examId, sessionId, timeOff, startTime });
      setStartTime(undefined);
    }
  }, [startTime, examId, sessionId]);

  const handleWindowBlur = () => {
    setStartTime(dayjs());
  };

  useEffect(() => {
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [handleWindowFocus]);
};
