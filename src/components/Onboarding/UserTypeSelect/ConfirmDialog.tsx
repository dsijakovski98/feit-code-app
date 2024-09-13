import { Fragment } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

import Button from "@/components/ui/Button";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const ConfirmDialog = ({ dialog }: Props) => {
  const {
    nextStep,
    userState: [userType],
  } = useCtx(OnboardingContext);

  const confirmChoice = () => {
    nextStep();
    dialog.toggleOff();
  };

  return (
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

            <ModalBody>Are you sure you are a {userType}? You cannot change this later.</ModalBody>

            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Go back
              </Button>
              <Button onPress={confirmChoice}>Continue</Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
