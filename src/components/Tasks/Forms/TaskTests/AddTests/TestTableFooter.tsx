import { ModalFooter } from "@nextui-org/react";

import Button from "@/components/ui/Button";

import { TaskFormContext } from "@/context/TaskFormContext";
import { useCtx } from "@/hooks/useCtx";

const TestsTableFooter = () => {
  const { testsState, stepState, createTask } = useCtx(TaskFormContext);
  const [tests] = testsState;
  const [, setTaskStep] = stepState;

  return (
    <ModalFooter className="justify-between">
      <Button
        color="default"
        variant="light"
        isDisabled={tests.length > 0}
        className="!bg-transparent pl-0"
        onPress={() => setTaskStep("define-tests")}
      >
        Go Back
      </Button>

      <Button className="w-[125px] px-8 text-sm" onPress={createTask}>
        Finish
      </Button>
    </ModalFooter>
  );
};

export default TestsTableFooter;
