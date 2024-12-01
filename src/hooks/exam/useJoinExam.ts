import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { joinExamSession } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useCtx } from "@/hooks/useCtx";

export const useJoinExam = () => {
  const {
    student,
    sessionIdState,
    exam: { id: examId },
  } = useCtx(ExamSessionContext);
  const [, setSessionId] = sessionIdState;

  const { mutate } = useMutation({
    mutationFn: joinExamSession,
    onSuccess: (key) => {
      if (!key) return;

      setSessionId(key);
    },
  });

  useEffect(() => {
    mutate({ examId, student });
  }, [mutate, examId, student]);
};
