import { Fragment } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import { Chip } from "@nextui-org/chip";
import { ModalBody, ModalFooter } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";

import DefineInputsForm from "@/components/Tasks/Forms/TaskTests/DefineTests/DefineInputsForm";
import OutputTypeForm from "@/components/Tasks/Forms/TaskTests/DefineTests/OutputTypeForm";
import TestInputsToggle from "@/components/Tasks/Forms/TaskTests/DefineTests/TestInputsToggle";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ParameterTypeIcon from "@/components/ui/ParameterTypeIcon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { TaskFormContext } from "@/context/TaskFormContext";
import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";

const DefineTests = () => {
  const { stepState: taskStepState } = useCtx(TaskFormContext);
  const [, setTaskStep] = taskStepState;

  const { withInputs, inputsMetaState } = useCtx(TestFormContext);
  const [inputsMeta, setInputsMeta] = inputsMetaState;

  const removeInput = (name: string) => {
    setInputsMeta((prev) => {
      return prev.filter((inputMeta) => inputMeta.name !== name);
    });
  };

  const handleCreateTests = () => {
    if (!withInputs.open || inputsMeta.length === 0) {
      withInputs.toggleOff();
      setInputsMeta([]);
    }

    setTaskStep("add-tests");
  };

  return (
    <Fragment>
      <ModalBody className="mb-10">
        <div className="space-y-6">
          <p className="text-lg font-semibold">Define the Task's Inputs and Outputs</p>

          <div className="space-y-6">
            <div>
              <TestInputsToggle />

              <PresenceBlock show={withInputs.open}>
                <div className="-translate-y-2">
                  <motion.div
                    layout
                    className={clsx(
                      "space-y-4 rounded-b-lg border-2 border-default-200 border-t-transparent pb-4",
                    )}
                  >
                    <DefineInputsForm />

                    {inputsMeta.length > 0 && (
                      <ol className="flex flex-wrap items-center gap-4 px-3">
                        {inputsMeta.map(({ name, type }) => (
                          <Tooltip
                            as="li"
                            content={type}
                            key={name}
                            classNames={{ content: "capitalize font-serif" }}
                          >
                            <Chip
                              onClose={() => removeInput(name)}
                              startContent={<ParameterTypeIcon type={type} className="mr-1 h-4 w-4" />}
                              className="rounded-full bg-default-200 px-3 py-4 pr-2 font-sans"
                              classNames={{ closeButton: "scale-80" }}
                            >
                              <span className="text-sm font-semibold text-default-foreground">{name}</span>
                            </Chip>
                          </Tooltip>
                        ))}
                      </ol>
                    )}
                  </motion.div>
                </div>
              </PresenceBlock>
            </div>

            <OutputTypeForm />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          color="default"
          variant="light"
          className="mr-auto !bg-transparent pl-0"
          onPress={() => setTaskStep("ask-tests")}
        >
          Go Back
        </Button>

        <Button startContent={<Icon name="test" className="h-4 w-4" />} onPress={handleCreateTests}>
          Add Tests
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default DefineTests;
