import { Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { cancelExam } from "@/actions/exams";
import { ROUTES } from "@/constants/routes";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const CancelExam = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { name } = examDetails;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: cancelExam,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({
        queryKey: [{ name: "exams" }],
      });

      toast(`${name} exam canceled!`);
      navigate(ROUTES.exams);
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    mutate(examDetails.id);
  };

  return (
    <Fragment>
      <Button color="danger" className="w-[140px] font-semibold lg:w-full" onPress={dialog.toggleOn}>
        Cancel
      </Button>

      <ConfirmDialog
        dialog={dialog}
        loading={isPending}
        color="danger"
        title="Cancel Exam?"
        description="You cannot undo this later."
        action={{ label: "Confirm", onConfirm }}
      />
    </Fragment>
  );
};

export default CancelExam;
