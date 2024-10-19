import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import CodeEditor from "../CodeEditor";
import clsx from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamFormContext } from "@/context/ExamFormContext";
import { TaskFormContext } from "@/context/TaskFormContext";
import { useCtx } from "@/hooks/useCtx";

const TaskCodeTemplate = () => {
  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const { templateState, stepState: taskStepState } = useCtx(TaskFormContext);
  const [initialTemplate, setTemplate] = templateState;
  const [taskStep] = taskStepState;

  const [savedValue, setSavedValue] = useState(initialTemplate);
  const [value, setValue] = useState(savedValue);

  const templateChanged = useMemo(() => savedValue !== value, [value, savedValue]);

  const handleSaveTemplate = () => {
    const newValue = value.trim();

    setTemplate(newValue);
    setSavedValue(newValue);

    toast.success("Template saved!");
  };

  if (taskStep !== "tests") {
    console.error('TaskCodeTemplate can only be shown during the "tests" step!');

    return null;
  }

  return (
    <div className="space-y-2">
      <div className="mb-4 flex items-center justify-between gap-6">
        <p className="text-lg">This will be the starting point of the task.</p>

        <Button
          color="default"
          variant="light"
          startContent={<Icon name="save" className="h-5 w-5" />}
          onPress={handleSaveTemplate}
          className={clsx("pointer-events-none opacity-0 transition-all", {
            "pointer-events-auto opacity-100": templateChanged,
          })}
        >
          Save
        </Button>
      </div>

      <p className="flex items-center gap-1">
        <Icon name="info" className="h-4 w-4 scale-110" />
        <span>You can edit this template or keep it as is</span>
      </p>

      {/* Wrapper needed to have smooth toggle animation */}
      <div className="h-[35dvh]">
        <CodeEditor
          height="35dvh"
          value={value}
          onChange={setValue}
          language={language}
          className="text-base"
        />
      </div>
    </div>
  );
};

export default TaskCodeTemplate;
