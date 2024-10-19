import { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import ValueTypeSelect from "@/components/Tasks/Forms/TaskTestForm/ValueTypeSelect";

import { VALUE_TYPE } from "@/constants/enums";
import { TaskTestSchema, isValueValid } from "@/utils/formSchemas/tasks/testSchema";

type Props = {
  onSubmit: SubmitHandler<TaskTestSchema>;
};

const OutputForm = ({ onSubmit }: Props) => {
  const form = useForm<TaskTestSchema>({
    resolver: valibotResolver(TaskTestSchema),
    defaultValues: {
      type: VALUE_TYPE.string,
      value: "",
    },
  });

  const { setError, getValues, handleSubmit } = form;

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const type = getValues("type");
    const value = getValues("value");

    const result = isValueValid({ type, value });

    if (!result.valid) {
      setError("value", { message: result.message });
      return;
    }

    handleSubmit(onSubmit)();
  };

  return (
    <form id="create-test-form" onSubmit={handleOnSubmit}>
      <div className="space-y-4">
        <p className="text-lg font-semibold">Define Output</p>

        <ValueTypeSelect form={form} className={'data-[type="empty"]:!-mb-1 data-[type="boolean"]:pb-6'} />
      </div>
    </form>
  );
};

export default OutputForm;
