import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

import CodeEditor from "../CodeEditor";
import clsx from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

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
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-6 pb-4">
        <p className="text-lg">This is the code template students will see to start off the task.</p>

        <Button
          color="default"
          variant="light"
          startContent={<Icon name="save" className="h-5 w-5" />}
          onPress={handleSave}
          className={clsx("pointer-events-none opacity-0 transition-all", {
            "pointer-events-auto opacity-100": templateChanged,
          })}
        >
          Save Template
        </Button>
      </div>

      <p className="flex items-center gap-1 font-semibold">
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
