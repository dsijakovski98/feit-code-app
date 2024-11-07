import { useCallback, useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { joinExamSession } from "@/actions/exam-session";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  studentId: string;
};

const SessionHandler = ({ studentId }: Props) => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId } = examDetails;

  const { mutate } = useMutation({
    mutationFn: joinExamSession,
  });

  useEffect(() => {
    mutate({ studentId, examId });
  }, [mutate, studentId, examId]);

  useBeforeUnload(
    useCallback(() => {
      // TODO: Save user progress
    }, []),
  );

  return null;
};

export default SessionHandler;
