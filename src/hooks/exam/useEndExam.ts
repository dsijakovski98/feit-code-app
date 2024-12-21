import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { endExam } from "@/actions/exams";
import { ROUTES } from "@/constants/routes";

type Options = {
  examId: string;
};

export const useEndExam = ({ examId }: Options) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endExam,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId }] }),
        queryClient.invalidateQueries({ queryKey: [{ name: "courses" }] }),
      ]);

      toast.success("Exam ended!");
      navigate(`${ROUTES.dashboard}${ROUTES.exams}/${examId}`, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
};
