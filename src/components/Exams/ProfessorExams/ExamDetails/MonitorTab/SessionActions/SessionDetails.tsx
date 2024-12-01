import { Fragment } from "react/jsx-runtime";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

import { Toggle } from "@/hooks/useToggle";
import { StudentSession } from "@/types/exams";

type Props = {
  dialog: Toggle;
  session: StudentSession | null;
  onClose?: () => void;
};

const SessionDetails = ({ dialog, session, onClose }: Props) => {
  return (
    <Modal
      isOpen={dialog.open && !!session}
      onOpenChange={dialog.toggle}
      onClose={onClose}
      hideCloseButton
      placement="center"
      backdrop="opaque"
      classNames={{
        base: "font-serif",
        backdrop: "bg-background/50",
        header: "border-b border-b-content3 dark:border-b-content3/50 py-3",
        body: "py-4",
      }}
    >
      <ModalContent>
        <Fragment>
          <ModalHeader className="text-2xl">Session Details</ModalHeader>

          {/* TODO: Session Details UI */}
          <ModalBody className="relative font-sans">Details here...</ModalBody>
        </Fragment>
      </ModalContent>
    </Modal>
  );
};

export default SessionDetails;
