import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishExam } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";
import { USER_TYPE } from "@/types";

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

      const ongoingExamKey = [{ name: "ongoing-exam", userId: studentId, type: USER_TYPE.student }];

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "submissions", studentId }] }),
        queryClient.setQueryData(ongoingExamKey, null),
      ]);

      queryClient.invalidateQueries({ queryKey: ongoingExamKey });

      toast.success("Exam finished!");
      navigate(ROUTES.dashboard, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
};
