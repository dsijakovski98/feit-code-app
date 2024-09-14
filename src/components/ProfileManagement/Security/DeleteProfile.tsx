import { Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import Button from "@/components/ui/Button";

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
    },
    onError: (error) => toast.error(error.message),
  });

  const handleDeleteProfile = () => {
    if (!user) return;
    if (!userData) return;

    const { type } = userData;

    mutate({ user, type });
  };

  return (
    <Fragment>
      <Button
        color="danger"
        className="w-[140px] py-[22px] text-sm font-semibold lg:w-full"
        onPress={dialog.toggleOn}
      >
        Delete Profile
      </Button>

      <Modal
        isOpen={dialog.open}
        onOpenChange={dialog.toggle}
        hideCloseButton
        placement="center"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-background/50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="text-2xl">Better safe than sorry</ModalHeader>

              <ModalBody>
                <p>
                  Are you sure you want to{" "}
                  <span className="font-medium text-danger">delete your profile?</span> No going
                  back after that.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  fullWidth
                  color="default"
                  variant="bordered"
                  isDisabled={isPending}
                  onPress={onClose}
                >
                  Go back
                </Button>

                <Button
                  fullWidth
                  color="danger"
                  isDisabled={isPending}
                  isLoading={isPending}
                  onPress={handleDeleteProfile}
                >
                  Yes, Bye
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default DeleteProfile;
