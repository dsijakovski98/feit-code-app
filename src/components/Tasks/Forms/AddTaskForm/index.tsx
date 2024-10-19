import { useMemo, useState } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";

import AskTests from "@/components/Tasks/Forms/AddTaskForm/AskTests";
import NewTaskForm from "@/components/Tasks/Forms/AddTaskForm/NewTaskForm";
import TaskCodeTemplate from "@/components/Tasks/TaskCodeTemplate";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import TaskFormProvider, { TaskFormStep } from "@/context/TaskFormContext";
import { Toggle, useToggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const AddTaskForm = ({ dialog }: Props) => {
  const stepState = useState<TaskFormStep>("task");
  const [step, setStep] = stepState;

  const templateToggle = useToggle();

  const handleClose = () => {
    setStep("task");
    dialog.toggleOff();
  };

  const progress = useMemo(() => {
    if (step === "task") return 1.5;
    if (step === "ask-tests") return 50;
    if (step === "tests") return 98.5;

    return 100;
  }, [step]);

  return (
    <Modal
      hideCloseButton
      backdrop="opaque"
      placement="center"
      isOpen={dialog.open}
      onClose={handleClose}
      classNames={{
        wrapper: "!translate-x-[55px]",
        base: "font-serif min-w-[720px] lg:min-w-[90%]",
        backdrop: "bg-background/50",
        body: "pb-0 pt-4",
      }}
    >
      <ModalContent>
        <TaskFormProvider stepState={stepState} taskDialog={dialog}>
          <ModalHeader className="mb-2 block space-y-1.5 pt-2">
            <div className="flex h-10 items-center justify-between">
              <h3 className="font-sans text-xl">Create a new Task</h3>

              <PresenceBlock show={step === "tests"} mode="appear">
                <Button
                  variant="light"
                  color="default"
                  className="!bg-transparent"
                  startContent={<Icon name={templateToggle.open ? "code-off" : "code"} className="h-5 w-5" />}
                  onPress={templateToggle.toggle}
                >
                  Template
                </Button>
              </PresenceBlock>
            </div>

            <Progress size="sm" value={progress} aria-label="Task creation progress" />
          </ModalHeader>

          <PresenceBlock show={!templateToggle.open}>
            <PresenceBlock show={step === "task"}>
              <ModalBody className="mb-10">
                <NewTaskForm />
              </ModalBody>

              <ModalFooter className="gap-4">
                <Button fullWidth color="default" variant="bordered" onPress={handleClose}>
                  Cancel
                </Button>

                <Button fullWidth type="submit" form="new-task-form">
                  Continue
                </Button>
              </ModalFooter>
            </PresenceBlock>

            <PresenceBlock show={step === "ask-tests"}>
              <AskTests />
            </PresenceBlock>

            <PresenceBlock show={step === "tests"}>
              <ModalBody></ModalBody>
            </PresenceBlock>
          </PresenceBlock>

          <PresenceBlock show={templateToggle.open}>
            <ModalBody>
              <TaskCodeTemplate />
            </ModalBody>

            <ModalFooter />
          </PresenceBlock>
        </TaskFormProvider>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskForm;
