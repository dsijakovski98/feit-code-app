import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

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
      placement="center"
      backdrop="transparent"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Better safe than sorry</ModalHeader>
            <ModalBody>Are you sure you are a {userType}?</ModalBody>

            <ModalFooter>
              <Button onPress={onClose}>Go back</Button>
              <Button onPress={confirmChoice} color="primary">
                Continue
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
