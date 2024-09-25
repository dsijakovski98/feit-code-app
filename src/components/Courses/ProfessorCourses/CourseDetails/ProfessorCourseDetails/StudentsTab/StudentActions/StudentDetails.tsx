import { Fragment } from "react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { User } from "@nextui-org/user";

import Timestamp from "@/components/ui/Timestamp";

import { StudentContext } from "@/context/StudentContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const StudentDetails = ({ dialog }: Props) => {
  const { student, joinedAt } = useCtx(StudentContext);
  const { id, firstName, lastName, email, indexNumber, indexYear, major } = student;

  const [avatarUrl, isLoading] = useAvatar(id);

  return (
    <Modal
      isOpen={dialog.open}
      onOpenChange={dialog.toggle}
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
          <ModalHeader className="text-2xl">Student Details</ModalHeader>

          <ModalBody className="relative font-sans">
            <div className="space-y-6">
              <User
                name={`${firstName} ${lastName}`}
                description={email}
                avatarProps={{
                  size: "lg",
                  src: avatarUrl ?? "",
                  showFallback: isLoading,
                }}
                classNames={{
                  name: "font-semibold text-lg",
                  description: "text-base",
                }}
              />

              <div>
                <p className="font-semibold">
                  {indexNumber}/{indexYear}
                </p>
                <p>
                  Student @ <span className="font-semibold">{major}</span>
                </p>
              </div>

              <p>
                Joined at <Timestamp>{joinedAt}</Timestamp>
              </p>
            </div>
          </ModalBody>
        </Fragment>
      </ModalContent>
    </Modal>
  );
};

export default StudentDetails;
