import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishExam } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";

type FinishExamOptions = {
  studentId: string;
};

export const useFinishExam = ({ studentId }: FinishExamOptions) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: finishExam,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({ queryKey: [{ name: "submissions", studentId }] });
      toast.success("Exam finished!");
      navigate(ROUTES.dashboard);
    },
    onError: (error) => toast.error(error.message),
  });
};