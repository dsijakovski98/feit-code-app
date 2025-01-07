import { Fragment } from "react";

import { InferSelectModel } from "drizzle-orm";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { User } from "@nextui-org/user";

import { students } from "@/db/schema";

import Timestamp from "@/components/ui/Timestamp";

import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
  student?: InferSelectModel<typeof students> | null;
  joinedAt?: string;
  onClose?: () => void;
};

const StudentDetails = ({ dialog, student, joinedAt, onClose }: Props) => {
  return (
    <Modal
      isOpen={dialog.open && !!student}
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
          <ModalHeader className="text-2xl">Student Details</ModalHeader>

          <ModalBody className="relative font-sans">
            {student && (
              <div className="space-y-6">
                <User
                  name={`${student.firstName} ${student.lastName}`}
                  description={student.email}
                  avatarProps={{
                    size: "lg",
                    src: student.avatarUrl ?? "",
                  }}
                  classNames={{
                    name: "font-semibold text-lg",
                    description: "text-base",
                  }}
                />

                <div>
                  <p className="font-semibold">
                    {student.indexNumber}/{student.indexYear}
                  </p>
                  <p>
                    Student @ <span className="font-semibold">{student.major}</span>
                  </p>
                </div>

                {!!joinedAt && (
                  <p>
                    Joined at <Timestamp>{joinedAt}</Timestamp>
                  </p>
                )}
              </div>
            )}
          </ModalBody>
        </Fragment>
      </ModalContent>
    </Modal>
  );
};

export default StudentDetails;
