import { useMemo, useState } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";

import AskTests from "@/components/Tasks/Forms/AddTaskForm/AskTests";
import NewTaskForm from "@/components/Tasks/Forms/AddTaskForm/NewTaskForm";
import AddTests from "@/components/Tasks/Forms/TaskTests/AddTests";
import DefineTests from "@/components/Tasks/Forms/TaskTests/DefineTests";
import Button from "@/components/ui/Button";
import PresenceBlock from "@/components/ui/PresenceBlock";

import TaskFormProvider, { TaskFormStep } from "@/context/TaskFormContext";
import TestFormProvider from "@/context/TestFormContext";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const AddTaskForm = ({ dialog }: Props) => {
  const stepState = useState<TaskFormStep>("task");
  const [step, setStep] = stepState;

  const handleClose = () => {
    setStep("task");
    dialog.toggleOff();
  };

  const progress = useMemo(() => {
    if (step === "task") return 1.5;
    if (step === "ask-tests") return 25;
    if (step === "define-tests") return 50;
    if (step === "add-tests") return 75;

    return 100;
  }, [step]);

  return (
    <Modal
      size="4xl"
      hideCloseButton
      backdrop="opaque"
      placement="center"
      isOpen={dialog.open}
      classNames={{
        base: "font-serif min-w-[720px] lg:min-w-[90%]",
        backdrop: "bg-background/50",
        body: "pb-0 pt-4",
      }}
    >
      <ModalContent>
        <TaskFormProvider stepState={stepState} taskDialog={dialog}>
          <ModalHeader className="mb-2 block space-y-1.5">
            <h3 className="font-sans text-xl">Create a new Task</h3>

            <Progress size="sm" value={progress} aria-label="Task creation progress" />
          </ModalHeader>

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

          <TestFormProvider>
            <PresenceBlock show={step === "define-tests"}>
              <DefineTests />
            </PresenceBlock>

            <PresenceBlock show={step === "add-tests"}>
              <AddTests />
            </PresenceBlock>
          </TestFormProvider>
        </TaskFormProvider>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskForm;
