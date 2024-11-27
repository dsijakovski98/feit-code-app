import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { ExamSessionOptions, joinExamSession } from "@/actions/exam-session";

export const useJoinExam = ({ examId, studentId }: ExamSessionOptions) => {
  const { mutate } = useMutation({
    mutationFn: joinExamSession,
  });

  useEffect(() => {
    mutate({ studentId, examId });
  }, [mutate, studentId, examId]);
};
