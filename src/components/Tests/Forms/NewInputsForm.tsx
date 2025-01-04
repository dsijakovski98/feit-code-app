import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import ParameterForm from "@/components/Tests/Forms/ParameterForm";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { VALUE_TYPE } from "@/constants/enums";
import { BOOLEANS } from "@/constants/tests";
import { ExamFormContext, InputType, TestType } from "@/context/ExamFormContext";
import { TaskFormContext } from "@/context/TaskFormContext";
import { InputMeta, TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";
import { isValueValid } from "@/utils/validation";

type NewTestSchema = Record<string | "Output", string>;

type Props = {
  columns: InputMeta[];
};

const NewInputsForm = ({ columns }: Props) => {
  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const { testsState } = useCtx(TaskFormContext);
  const [, setTests] = testsState;

  const { inputsMetaState, outputTypeState } = useCtx(TestFormContext);
  const [inputsMeta] = inputsMetaState;
  const [outputType] = outputTypeState;

  const defaultValues = useMemo(() => {
    const vals: Record<string, string> = {
      Output: "",
    };

    columns.forEach((input) => {
      if (input.type === VALUE_TYPE.empty) {
        vals[input.name] = LANGUAGES_CONFIG[language].emptyValue || "None";
      } else if (input.type === VALUE_TYPE.boolean) {
        vals[input.name] = BOOLEANS.true;
      } else {
        vals[input.name] = "";
      }
    });

    return vals;
  }, [columns, language]);

  const { reset, control, setError, handleSubmit } = useForm<NewTestSchema>({
    defaultValues,
  });

  const isValidField = (field: InputType) => {
    const { name, type, value } = field;

    if (type === VALUE_TYPE.number && value.trim().length === 0) {
      setError(name, { message: "Field is required!" });
      return false;
    }

    const result = isValueValid({ type, value });

    if (!result.valid) {
      setError(name, { message: result.message });
      return false;
    }

    return true;
  };

  const onSubmit: SubmitHandler<NewTestSchema> = (formData) => {
    const { Output: output, ...inputs } = formData;

    let error = false;

    for (const inputMeta of inputsMeta) {
      const { name, type } = inputMeta;
      const value = inputs[name];

      const inputValid = isValidField({ name, type, value });

      if (!inputValid) {
        error = true;
      }
    }

    const outputValid = isValidField({ name: "Output", type: outputType, value: output });

    if (!outputValid) {
      error = true;
    }

    if (error) return;

    const newTest: TestType = {
      id: crypto.randomUUID(),
      type: outputType,
      value: output,
      inputs: inputsMeta.map((inputMeta) => ({
        ...inputMeta,
        value: inputs[inputMeta.name],
      })),
    };

    setTests((prev) => [...prev, newTest]);
    toast.success("Test added!");

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end">
      <Table
        hideHeader
        removeWrapper
        focusMode="cell"
        aria-label="Inputs/Output values form"
        className="h-[100]px"
      >
        <TableHeader columns={columns}>
          {columns.map(({ name }) => (
            <TableColumn key={name} className="text-sm">
              {name}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          <TableRow key="Form" className="flex items-baseline gap-1 *:basis-full">
            {columns.map(({ name, type }) => (
              <TableCell key={name} hidden={name === "Actions"}>
                {name !== "Actions" && (
                  <div className="min-w-[100px]">
                    <ParameterForm control={control} name={name} type={type} />

                    {name === "Output" && (
                      <Button
                        fullWidth
                        type="submit"
                        color="default"
                        className="mt-3"
                        startContent={<Icon name="add" className="h-5 w-5" />}
                      >
                        Add Test
                      </Button>
                    )}
                  </div>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
};

export default NewInputsForm;
