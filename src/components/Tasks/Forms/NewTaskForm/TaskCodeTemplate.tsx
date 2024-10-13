import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

import CodeEditor from "../../../CodeEditor";
import clsx from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { baseTaskTemplate } from "@/utils/code";
import { TaskSchema } from "@/utils/formSchemas/tasks/taskSchema";

type Props = {
  template: string;
  form: UseFormReturn<TaskSchema>;
  onSave: (template: string) => void;
};

const TaskCodeTemplate = ({ form, template, onSave }: Props) => {
  const { getValues } = form;
  const title = getValues("title");
  const description = getValues("description");

  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const [savedValue, setSavedValue] = useState(
    template || baseTaskTemplate({ title, description, language }),
  );
  const [value, setValue] = useState(savedValue);

  const templateChanged = useMemo(() => savedValue !== value, [value, savedValue]);

  const handleSave = () => {
    const newValue = value.trim();

    onSave(newValue);
    setSavedValue(newValue);

    toast.success("Saved new template!");
  };

  return (
    <div className="space-y-2">
      <div className="mb-4 flex items-center justify-between gap-6">
        <p className="text-lg">This will be the starting point of the task.</p>

        <Button
          color="default"
          variant="light"
          startContent={<Icon name="save" className="h-5 w-5" />}
          onPress={handleSave}
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
