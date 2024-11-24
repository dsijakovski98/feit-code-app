import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { joinExamSession } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useCtx } from "@/hooks/useCtx";

const SessionHandler = () => {
  const { student, exam } = useCtx(ExamSessionContext);
  const { id: studentId } = student;
  const { id: examId } = exam;

  const { mutate } = useMutation({
    mutationFn: joinExamSession,
  });

  useEffect(() => {
    mutate({ studentId, examId });
  }, [mutate, studentId, examId]);

  return null;
};

export default SessionHandler;
