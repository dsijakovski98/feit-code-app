import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem } from "@nextui-org/select";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import ParameterTypeIcon from "@/components/ui/ParameterTypeIcon";

import { VALUE_TYPE } from "@/constants/enums";
import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";
import { TestInputSchema } from "@/utils/formSchemas/tasks/testSchema";

const DefineInputsForm = () => {
  const { inputsMetaState } = useCtx(TestFormContext);
  const [inputsMeta, setInputsMeta] = inputsMetaState;

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, defaultValues },
  } = useForm<TestInputSchema>({
    resolver: valibotResolver(TestInputSchema),
    defaultValues: {
      name: "",
      type: "string",
      value: "",
    },
  });

  const onSubmit: SubmitHandler<TestInputSchema> = ({ name, type }) => {
    const inputExists = inputsMeta.find((inputMeta) => inputMeta.name === name);

    if (inputExists) {
      const message = `Input "${name}" already exists!`;
      setError("root", { message });
      toast.error(message);

      return;
    }

    setInputsMeta((prev) => [...prev, { name, type }]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between gap-8 pl-4 pr-8">
      <div className="flex grow items-baseline gap-8">
        <Controller
          control={control}
          name="name"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              size="sm"
              label="Input name"
              color="default"
              variant="underlined"
              placeholder="ex. firstName"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-base",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              size="sm"
              label="Input type"
              color="default"
              variant="underlined"
              selectionMode="single"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              defaultSelectedKeys={[defaultValues!.type!]}
              classNames={{
                label: "font-semibold text-base !text-foreground",
              }}
            >
              {Object.values(VALUE_TYPE).map((type) => {
                return (
                  <SelectItem
                    key={type}
                    textValue={type}
                    classNames={{ title: "flex text-sm items-center gap-2" }}
                  >
                    <ParameterTypeIcon type={type} className="h-4 w-4" />
                    {type}
                  </SelectItem>
                );
              })}
            </Select>
          )}
        />
      </div>

      <Button type="submit" isIconOnly variant="light" color="default" radius="full">
        <Icon name="add" className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default DefineInputsForm;
