import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { StudentSessionContext } from "@/context/StudentSessionContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const RemoveSession = ({ dialog }: Props) => {
  const { session } = useCtx(StudentSessionContext);
  const { student } = session;
  const { firstName, lastName } = student;

  const { mutate, isPending } = useMutation({
    // TODO: Remove session flow
    mutationFn: undefined,
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    mutate();
  };

  return (
    <ConfirmDialog
      dialog={dialog}
      loading={isPending}
      color="danger"
      title="Remove from Exam?"
      description={
        <p>
          <span className="font-semibold">
            {firstName} {lastName}
          </span>{" "}
          will be removed from the exam session.
        </p>
        // TODO: Add Reason input
      }
      action={{ label: "Remove", onConfirm }}
    />
  );
};

export default RemoveSession;
