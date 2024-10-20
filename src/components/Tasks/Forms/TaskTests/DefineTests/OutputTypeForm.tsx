import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem } from "@nextui-org/select";

import ParameterTypeIcon from "@/components/ui/ParameterTypeIcon";

import { InputValueType, VALUE_TYPE } from "@/constants/enums";
import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";
import { TypeSchema } from "@/utils/formSchemas/tasks/testSchema";

const OutputTypeForm = () => {
  const { outputTypeState } = useCtx(TestFormContext);
  const [, setOutputType] = outputTypeState;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, defaultValues },
  } = useForm<TypeSchema>({
    resolver: valibotResolver(TypeSchema),
    defaultValues: {
      type: "string",
    },
  });

  const onSubmit: SubmitHandler<TypeSchema> = ({ type }) => {
    setOutputType(type);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow">
      <Controller
        control={control}
        name="type"
        disabled={isSubmitting}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            size="lg"
            label="Output type"
            color="default"
            variant="bordered"
            selectionMode="single"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            defaultSelectedKeys={[defaultValues!.type!]}
            renderValue={(items) => {
              const type = items[0].textValue as InputValueType;

              return (
                <p className="flex items-center gap-2">
                  <ParameterTypeIcon type={type} className="h-5 w-5" /> {type}
                </p>
              );
            }}
            classNames={{
              base: "h-[76px]",
              trigger: "!h-[76px] px-4 border-2",
              label: "font-semibold text-lg lg:text-base !text-foreground",
              innerWrapper: "-mb-1",
              selectorIcon: "scale-125 mr-2",
            }}
          >
            {Object.values(VALUE_TYPE).map((type) => {
              return (
                <SelectItem
                  key={type}
                  textValue={type}
                  classNames={{ title: "flex text-base items-center gap-2" }}
                >
                  <ParameterTypeIcon type={type} className="h-5 w-5" />
                  {type}
                </SelectItem>
              );
            })}
          </Select>
        )}
      />
    </form>
  );
};

export default OutputTypeForm;
