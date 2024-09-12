import { Fragment } from "react";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import Button from "@/components/ui/Button";

import { resetPassword } from "@/actions/users";
import { useToggle } from "@/hooks/useToggle";

const ResetPassword = () => {
  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (success) => {
      if (!success) return;

      // TODO: On success reset pwd
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Fragment>
      <Button
        color="warning"
        variant="solid"
        className="w-[140px] text-sm font-semibold"
        onPress={dialog.toggleOn}
      >
        Reset password
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
              <ModalHeader className="text-2xl">Password reset</ModalHeader>

              <ModalBody>Reset form here</ModalBody>

              <ModalFooter>
                <Button fullWidth color="default" variant="bordered" onPress={onClose}>
                  Go back
                </Button>

                <Button fullWidth color="primary" onPress={resetPassword}>
                  Submit
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ResetPassword;
