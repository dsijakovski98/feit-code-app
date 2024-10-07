import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { ButtonProps } from "@nextui-org/react";

import NewTaskForm from "@/components/Tasks/Forms/NewTaskForm";
import TaskCodeTemplate from "@/components/Tasks/TaskCodeTemplate";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext } from "@/context/ExamFormContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { TaskSchema } from "@/utils/formSchemas/tasks/taskSchema";

type Props = Pick<ButtonProps, "variant" | "color" | "size">;

const AddTask = (props: Props = { color: "default", variant: "light", size: "md" }) => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { remainingPoints } = useCtx(ExamFormContext);

  const dialog = useToggle();
  const templateToggle = useToggle();

  const [template, setTemplate] = useState("");

  const form = useForm<TaskSchema>({
    resolver: valibotResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      points: "",
    },
  });

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
        hideCloseButton
        backdrop="opaque"
        placement="center"
        isOpen={dialog.open}
        onOpenChange={dialog.toggle}
        classNames={{
          base: "font-serif min-w-[720px] lg:min-w-[90%]",
          backdrop: "bg-background/50",
          header: "border-b border-b-content3 dark:border-b-content3/50 py-3",
          body: "pb-0 pt-4",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="items-center justify-between text-lg">
                <h3>Create a new Task</h3>

                <Button
                  size="sm"
                  variant="light"
                  color="default"
                  className="text-sm hover:!bg-transparent"
                  startContent={<Icon name={templateToggle.open ? "code-off" : "code"} className="h-4 w-4" />}
                  onPress={templateToggle.toggle}
                >
                  Template
                </Button>
              </ModalHeader>

              <PresenceBlock show={!templateToggle.open}>
                <ModalBody className="mb-12">
                  <NewTaskForm form={form} dialog={dialog} taskTemplate={template} />
                </ModalBody>

                <ModalFooter className="gap-4">
                  <Button fullWidth color="default" variant="bordered" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button fullWidth type="submit" form="new-task-form">
                    Create Task
                  </Button>
                </ModalFooter>
              </PresenceBlock>

              <PresenceBlock show={templateToggle.open}>
                <ModalBody>
                  <TaskCodeTemplate form={form} onSave={setTemplate} template={template} />
                </ModalBody>

                <ModalFooter />
              </PresenceBlock>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddTask;
