import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { joinExamSession } from "@/actions/exam-session";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  studentId: string;
};

const JoinSessionHandler = ({ studentId }: Props) => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId } = examDetails;

  const { mutate } = useMutation({
    mutationFn: joinExamSession,
  });

  useEffect(() => {
    mutate({ studentId, examId });
  }, [mutate, studentId, examId]);

  return null;
};

export default JoinSessionHandler;
