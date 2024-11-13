import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import Button from "@/components/ui/Button";

import { leaveExamSession } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useCtx } from "@/hooks/useCtx";

const LeaveSession = () => {
  const { student, exam } = useCtx(ExamSessionContext);
  const { id: studentId } = student;
  const { id: examId } = exam;

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: leaveExamSession,
    onSuccess: (success) => {
      if (!success) return;

      navigate(ROUTES.dashboard);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleLeaveSession = () => {
    mutate({ examId, studentId });
  };

  return (
    <Button isLoading={isPending} onPress={handleLeaveSession}>
      Leave
    </Button>
  );
};

export default LeaveSession;
