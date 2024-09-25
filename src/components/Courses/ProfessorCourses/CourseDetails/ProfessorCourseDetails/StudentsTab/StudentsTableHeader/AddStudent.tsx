import { Fragment } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const AddStudent = () => {
  const { isMobile } = useCtx(ResponsiveContext);
  const {
    courseDetails: { id },
  } = useCtx(CourseDetailsContext);

  const dialog = useToggle();

  return (
    <Fragment>
      <Button
        size={isMobile ? "sm" : "md"}
        startContent={<Icon name="add" className="h-5 w-5" />}
        className="lg:text-sm"
        onPress={dialog.toggleOn}
      >
        {!isMobile && "Add"} Students
      </Button>
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
          body: "pb-0 pt-4",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="text-2xl">New Students</ModalHeader>

              {/* TODO: Student select input here */}
              <ModalBody className="relative">Select input here {id}</ModalBody>

              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Cancel
                </Button>

                <Button type="submit" color="primary">
                  Add Student
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddStudent;
