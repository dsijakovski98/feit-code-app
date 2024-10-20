import { useMemo } from "react";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ParameterForm from "@/components/Tests/Forms/ParameterForm";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { VALUE_TYPE } from "@/constants/enums";
import { BOOLEANS } from "@/constants/tests";
import { ExamFormContext, TestType } from "@/context/ExamFormContext";
import { TaskFormContext } from "@/context/TaskFormContext";
import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";
import { isValueValid } from "@/utils/validation";

type OutputSchema = {
  Output: string;
};

const NewOutputForm = () => {
  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const { testsState } = useCtx(TaskFormContext);
  const [, setTests] = testsState;

  const { outputTypeState } = useCtx(TestFormContext);
  const [outputType] = outputTypeState;

  const defaultValues = useMemo(() => {
    const vals: OutputSchema = {
      Output: "",
    };

    if (outputType === VALUE_TYPE.empty) {
      vals.Output = LANGUAGES_CONFIG[language].emptyValue || "None";
    } else if (outputType === VALUE_TYPE.boolean) {
      vals.Output = BOOLEANS.true;
    } else {
      vals.Output = "";
    }

    return vals;
  }, [language, outputType]);

  const { reset, control, setError, handleSubmit } = useForm<OutputSchema>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<OutputSchema> = ({ Output: output }) => {
    if (outputType === VALUE_TYPE.number && output.trim().length === 0) {
      setError("Output", { message: "Field is required!" });
      return;
    }

    const result = isValueValid({ type: outputType, value: output });

    if (!result.valid) {
      setError("Output", { message: result.message });
      return;
    }

    const newTest: TestType = {
      id: crypto.randomUUID(),
      type: outputType,
      value: output,
      inputs: [],
    };

    setTests((prev) => [...prev, newTest]);
    toast.success("Test added!");

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-baseline gap-12">
      <ParameterForm control={control as unknown as Control} name="Output" type={outputType} />

      <Button
        type="submit"
        color="default"
        startContent={<Icon name="add" className="h-5 w-5" />}
        className="shrink-0"
      >
        Add Test
      </Button>
    </form>
  );
};

export default NewOutputForm;
