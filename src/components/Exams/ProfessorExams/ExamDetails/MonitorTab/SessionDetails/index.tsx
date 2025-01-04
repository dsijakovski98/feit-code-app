import { Fragment } from "react";

import { Avatar } from "@nextui-org/avatar";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

import PasteCountChart from "@/components/ui/ExamStats/PasteCountChart";
import TimeOffChart from "@/components/ui/ExamStats/TimeOffChart";

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
      size="4xl"
      placement="center"
      backdrop="opaque"
      classNames={{
        base: "font-serif",
        backdrop: "bg-background/50",
        header: "border-b border-b-content3 dark:border-b-content3/50 py-4",
        body: "pt-2 pb-6",
      }}
    >
      <ModalContent>
        <Fragment>
          <ModalHeader className="text-2xl">
            <div className="flex items-center gap-4">
              <Avatar src={session?.student.avatarUrl} showFallback={!!session} size="sm" />
              <p>
                {session?.student.firstName} {session?.student.lastName}
              </p>
            </div>
          </ModalHeader>

          <ModalBody className="space-y-2 font-sans">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Time spent off session</h3>

                <p className="text-foreground-300">
                  Time chunks (in minutes) when{" "}
                  <b>
                    {session?.student.firstName} {session?.student.lastName}
                  </b>{" "}
                  was off the session.
                </p>
              </div>

              {session && <PasteCountChart pasteCount={session.pasteCount} />}
            </div>

            {session && <TimeOffChart timeOff={session.timeOff} />}
          </ModalBody>
        </Fragment>
      </ModalContent>
    </Modal>
  );
};

export default SessionDetails;
