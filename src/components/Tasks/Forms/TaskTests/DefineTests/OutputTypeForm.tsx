import { Controller, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem } from "@nextui-org/select";
import { SharedSelection } from "@nextui-org/system-rsc";

import ParameterTypeIcon from "@/components/ui/ParameterTypeIcon";

import { InputValueType, VALUE_TYPE } from "@/constants/enums";
import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";
import { TypeSchema } from "@/utils/schemas/tasks/testSchema";

const OutputTypeForm = () => {
  const { outputTypeState } = useCtx(TestFormContext);
  const [, setOutputType] = outputTypeState;

  const {
    control,
    formState: { isSubmitting, defaultValues },
  } = useForm<TypeSchema>({
    resolver: valibotResolver(TypeSchema),
    defaultValues: {
      type: VALUE_TYPE.string,
    },
  });

  const handleSelectionChange = (keys: SharedSelection) => {
    const [type] = [...keys];

    setOutputType(type as InputValueType);
  };

  return (
    <form className="grow">
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
            onSelectionChange={handleSelectionChange}
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
