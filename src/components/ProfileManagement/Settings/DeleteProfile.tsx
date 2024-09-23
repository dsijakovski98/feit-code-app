import { Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { deleteProfile } from "@/actions/users";
import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { useToggle } from "@/hooks/useToggle";

const DeleteProfile = () => {
  const { user } = useUser();
  const { userData } = useFCUser();

  const navigate = useNavigate();

  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProfile,
    onSuccess: (success) => {
      if (!success) return;

      navigate(ROUTES.signIn);
      toast(`Goodbye ${userData?.user.firstName}!`);
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    if (!user) return;
    if (!userData) return;

    const { type } = userData;

    mutate({ user, type });
  };

  return (
    <Fragment>
      <Button color="danger" className="w-[140px] shrink-0 font-semibold lg:w-full" onPress={dialog.toggleOn}>
        Delete Profile
      </Button>

      <ConfirmDialog
        dialog={dialog}
        loading={isPending}
        color="danger"
        title="Delete Profile?"
        description="You cannot undo this later."
        action={{ label: "Delete", onConfirm }}
      />
    </Fragment>
  );
};

export default DeleteProfile;
