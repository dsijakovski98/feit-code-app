import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { leaveExamSession } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";

export const useLeaveExam = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: leaveExamSession,
    onSuccess: (success) => {
      if (!success) return;

      navigate(ROUTES.dashboard);
    },
    onError: (error) => toast.error(error.message),
  });
};
