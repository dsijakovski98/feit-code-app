import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { addFeedback } from "@/actions/grades";
import { ROUTES } from "@/constants/routes";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { feedbackKey } from "@/utils";

type Props = {
  dialog: Toggle;
  feedback: string;
};

const SubmitFeedback = ({ dialog, feedback }: Props) => {
  const { submission } = useCtx(GradeSubmissionContext);
  const { exam, student } = submission;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: mutateFeedback, isPending: feedbackLoading } = useMutation({
    mutationFn: addFeedback,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId: exam.id }] });

      localStorage.removeItem(feedbackKey(submission.id));
      toast.success(`Submitted feedback for ${student.firstName}'s task!`);
      navigate(`${ROUTES.dashboard}${ROUTES.exams}/${exam.id}#results`);
    },
    onError: (error) => toast.error(error.message),
  });

  const submitFeedback = () => {
    mutateFeedback({ submissionId: submission.id, feedback });
  };

  return (
    <ConfirmDialog
      dialog={dialog}
      loading={feedbackLoading}
      color="primary"
      title="Submit feedback?"
      // TODO: Add form for submitting tasks points
      description="You're happy with the feedback you left."
      action={{ label: "Submit", onConfirm: submitFeedback }}
    />
  );
};

export default SubmitFeedback;
