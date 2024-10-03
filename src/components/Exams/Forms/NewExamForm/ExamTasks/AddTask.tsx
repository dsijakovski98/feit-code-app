import { Fragment } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { ButtonProps } from "@nextui-org/react";

import NewTaskForm from "@/components/Tasks/Forms/NewTaskForm";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamFormContext } from "@/context/ExamFormContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

type Props = Pick<ButtonProps, "variant" | "color" | "size">;

const AddTask = (props: Props = { color: "default", variant: "light", size: "md" }) => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { remainingPoints } = useCtx(ExamFormContext);

  const dialog = useToggle();

  return (
    <Fragment>
      <Button
        size={isMobile ? "md" : "lg"}
        isDisabled={remainingPoints <= 0}
        onPress={dialog.toggleOn}
        startContent={<Icon name="add" className="h-5 w-5" />}
        className="pl-3 lg:text-sm"
        {...props}
      >
        Add Task
      </Button>

      <Modal
        size="3xl"
        hideCloseButton
        backdrop="opaque"
        placement="center"
        isOpen={dialog.open}
        onOpenChange={dialog.toggle}
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
              <ModalHeader className="text-lg">Create a new Task</ModalHeader>

              <ModalBody className="mb-12">
                <NewTaskForm dialog={dialog} />
              </ModalBody>

              <ModalFooter className="gap-4">
                <Button fullWidth color="default" variant="bordered" onPress={onClose}>
                  Cancel
                </Button>

                <Button fullWidth type="submit" form="new-task-form">
                  Create Task
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddTask;
