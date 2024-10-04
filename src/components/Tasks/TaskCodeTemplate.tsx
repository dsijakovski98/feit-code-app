import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

import CodeEditor from "../CodeEditor";
import clsx from "clsx";

import Button from "@/components/ui/Button";

import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { baseTaskTemplate } from "@/utils/code";
import { TaskSchema } from "@/utils/formSchemas/tasks/taskSchema";

type Props = {
  form: UseFormReturn<TaskSchema>;
  templateToggle: Toggle;
  onSave: (template: string) => void;
};

const TaskCodeTemplate = ({ form, templateToggle, onSave }: Props) => {
  const { getValues } = form;
  const title = getValues("title");
  const description = getValues("description");

  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const defaultValue = baseTaskTemplate({ title, description, language });
  const [value, setValue] = useState(defaultValue);

  const templateChanged = useMemo(() => defaultValue !== value, [value, defaultValue]);

  const handleSave = () => {
    onSave(value.trim());
    templateToggle.toggleOff();

    toast.success("Saved new template!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-semibold">This is the code template students will see to start off the task.</p>
          <p className="font-light text-foreground-300">You can edit the template or keep it as is.</p>
        </div>

        <Button
          className={clsx("pointer-events-none opacity-0 transition-all", {
            "pointer-events-auto opacity-100": templateChanged,
          })}
          onPress={handleSave}
        >
          Save
        </Button>
      </div>

      {/* Wrapper needed to have smooth toggle animation */}
      <div className="h-[25dvh]">
        <CodeEditor
          height="25dvh"
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
