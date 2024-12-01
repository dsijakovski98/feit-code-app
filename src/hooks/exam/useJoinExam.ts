import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { ExamSessionOptions, joinExamSession } from "@/actions/exam-session";

export const useJoinExam = ({ examId, student }: ExamSessionOptions) => {
  const { mutate } = useMutation({
    mutationFn: joinExamSession,
  });

  useEffect(() => {
    mutate({ examId, student });
  }, [mutate, examId, student]);
};
