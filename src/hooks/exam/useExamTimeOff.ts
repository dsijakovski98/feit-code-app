import { useCallback, useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import { ExamSessionOptions, handleSessionTimeOff } from "@/actions/exam-session";

export const useExamTimeOff = ({ examId, studentId }: ExamSessionOptions) => {
  const [startTime, setStartTime] = useState<Dayjs>();

  const handleWindowFocus = useCallback(() => {
    if (!startTime) return;

    const timeOff = dayjs().diff(startTime, "seconds");

    if (timeOff > 0) {
      handleSessionTimeOff({ examId, studentId, timeOff, startTime });
      setStartTime(undefined);
    }
  }, [startTime, examId, studentId]);

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
