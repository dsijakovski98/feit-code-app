import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import Button from "@/components/ui/Button";

import { leaveExamSession } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  studentId: string;
};

const LeaveSession = ({ studentId }: Props) => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId } = examDetails;

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
