import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import InputsForm from "@/components/Tasks/Forms/OldTaskTestForm/InputsForm";
import InputsSelect from "@/components/Tasks/Forms/OldTaskTestForm/InputsSelect";
import OutputForm from "@/components/Tasks/Forms/OldTaskTestForm/OutputForm";
import Button from "@/components/ui/Button";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { INPUT_SELECT } from "@/constants/tests";
import { ExamFormContext, InputType, TaskType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { TaskTestSchema } from "@/utils/formSchemas/tasks/testSchema";

type Props = {
  dialog: Toggle;
  task: TaskType | null;
};

const TaskTestForm = ({ task, dialog }: Props) => {
  const { tasksState } = useCtx(ExamFormContext);
  const [, setTasks] = tasksState;

  const [step, setStep] = useState<"start" | "inputs" | "outputs">("start");

  const inputsState = useState<InputType[]>([]);
  const [inputs, setInputs] = inputsState;

  const handleOnClose = () => {
    setStep("start");
    dialog.toggleOff();
  };

  const handleInputSelect = (val: string) => {
    const selectVal = val as (typeof INPUT_SELECT)[keyof typeof INPUT_SELECT];

    if (selectVal === INPUT_SELECT.empty) {
      setStep("outputs");
      setInputs([]); // Clear any previous inputs to enable backwards navigation through steps
      return;
    }

    if (selectVal === INPUT_SELECT.inputs) {
      setStep("inputs");
      return;
    }

    throw new Error(`Invalid input select value: ${selectVal}`);
  };

  const createTest: SubmitHandler<TaskTestSchema> = (test) => {
    setTasks((prev) => {
      const idx = prev.findIndex((prevTask) => prevTask.title === task?.title);

      if (idx === -1) return prev;

      prev[idx].tests.push({ ...test, inputs });

      return [...prev];
    });
    handleOnClose();
    toast.success("Added a new test!");
  };

  return (
    <Modal
      size="2xl"
      backdrop="blur"
      placement="center"
      hideCloseButton
      isOpen={dialog.open}
      onClose={handleOnClose}
      classNames={{
        backdrop: "backdrop-blur-sm brightness-50 dark:mix-blend-darken",
      }}
    >
      <ModalContent>
        <ModalHeader className="block text-2xl">
          <p>Create a new Test</p>
          <p className="text-base font-normal">{task?.title}</p>
        </ModalHeader>

        <PresenceBlock show={step === "start"}>
          <ModalBody className="pb-9">
            <InputsSelect onValueChange={handleInputSelect} />
          </ModalBody>
        </PresenceBlock>

        <PresenceBlock show={step === "inputs"}>
          <ModalBody className="mb-2">
            <InputsForm inputsState={inputsState} />
          </ModalBody>

          <ModalFooter>
            <Button color="default" onPress={() => setStep("start")} className="text-sm">
              Go Back
            </Button>
            <Button onPress={() => setStep("outputs")} isDisabled={inputs.length === 0} className="text-sm">
              Continue
            </Button>
          </ModalFooter>
        </PresenceBlock>

        <PresenceBlock show={step === "outputs"}>
          <ModalBody className="mb-2">
            <OutputForm onSubmit={createTest} />
          </ModalBody>

          <ModalFooter>
            <Button color="default" onPress={() => setStep("start")} className="text-sm">
              Go Back
            </Button>
            <Button type="submit" form="create-test-form" className="text-sm">
              Create Test
            </Button>
          </ModalFooter>
        </PresenceBlock>
      </ModalContent>
    </Modal>
  );
};

export default TaskTestForm;