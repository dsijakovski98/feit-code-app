import { Fragment, useMemo } from "react";

import { ModalBody, ModalFooter } from "@nextui-org/modal";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamFormContext } from "@/context/ExamFormContext";
import { TaskFormContext } from "@/context/TaskFormContext";
import { useCtx } from "@/hooks/useCtx";
import { supportsTests } from "@/utils/code";

const AskTests = () => {
  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const { stepState: taskStepState, createTask } = useCtx(TaskFormContext);
  const [, setTaskStep] = taskStepState;

  const testsSupported = useMemo(() => supportsTests(language), [language]);

  return (
    <Fragment>
      <ModalBody className="mb-10">
        {testsSupported ? (
          <div className="font-sans">
            <p className="text-lg font-semibold">Do you want to create Tests for this Task?</p>
            <p className="text-foreground-300">
              They can help make the review process much quicker and easier
            </p>
          </div>
        ) : (
          <p className="font-sans text-lg font-semibold text-foreground-300">
            Tests are not yet supported in {language} exams
          </p>
        )}
      </ModalBody>

      <ModalFooter className="items-center">
        <Button
          color="default"
          variant="light"
          className="mr-auto !bg-transparent pl-0"
          onPress={() => setTaskStep("task")}
        >
          Go Back
        </Button>

        <div className="flex items-center gap-4">
          <Button color="default" onPress={createTask}>
            Continue without Tests
          </Button>

          {testsSupported && (
            <Button
              startContent={<Icon name="test" className="h-4 w-4" />}
              onPress={() => setTaskStep("define-tests")}
            >
              Create Tests
            </Button>
          )}
        </div>
      </ModalFooter>
    </Fragment>
  );
};

export default AskTests;
