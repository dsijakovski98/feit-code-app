import { Fragment } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import clsx, { ClassValue } from "clsx";

import { SharedSelection } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

import Input from "@/components/ui/Input";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { VALUE_TYPE } from "@/constants/enums";
import { BOOLEANS } from "@/constants/tests";
import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { TypeValueSchema } from "@/utils/formSchemas/tasks/testSchema";

type Props = {
  form: UseFormReturn<TypeValueSchema>;
  className?: ClassValue;
};

const ValueTypeSelect = ({ form, className = "" }: Props) => {
  const {
    watch,
    control,
    setValue,
    clearErrors,
    formState: { isSubmitting, defaultValues },
  } = form;

  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const type = watch("type");

  const handleTypeChange = (keys: SharedSelection) => {
    const [newType] = [...keys] as [typeof type];

    if (newType === VALUE_TYPE.empty) {
      setValue("value", LANGUAGES_CONFIG[language].emptyValue ?? "None");
    } else if (newType === VALUE_TYPE.boolean) {
      setValue("value", BOOLEANS.true);
    } else {
      setValue("value", "");
    }

    clearErrors("value");
  };

  return (
    <div data-type={type} className={clsx("flex h-[88px] items-baseline gap-6", className)}>
      <Controller
        control={control}
        name="type"
        disabled={isSubmitting}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            size="lg"
            label="Type"
            color="default"
            variant="underlined"
            selectionMode="single"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            isInvalid={fieldState.invalid}
            onSelectionChange={handleTypeChange}
            errorMessage={fieldState.error?.message}
            defaultSelectedKeys={[defaultValues!.type!]}
            classNames={{
              label: "font-semibold text-lg lg:text-base !text-foreground",
              value: "text-lg",
            }}
          >
            {Object.values(VALUE_TYPE).map((type) => {
              return (
                <SelectItem key={type} textValue={type}>
                  {type}
                </SelectItem>
              );
            })}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="value"
        disabled={isSubmitting}
        render={({ field, fieldState }) => (
          <Fragment>
            {type === VALUE_TYPE.string && (
              <Input
                {...field}
                size="lg"
                label="Value"
                color="default"
                variant="underlined"
                placeholder="Enter any string"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}

            {type === VALUE_TYPE.number && (
              <Input
                {...field}
                size="lg"
                label="Value"
                color="default"
                inputMode="numeric"
                variant="underlined"
                placeholder="Enter any number"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}

            {type === VALUE_TYPE.empty && (
              <Input
                {...field}
                readOnly
                size="lg"
                label="Value"
                color="default"
                variant="underlined"
                description={`Empty value in ${language}`}
                classNames={{ input: "font-mono !text-foreground-300", description: "text-sm" }}
              />
            )}

            {type === VALUE_TYPE.boolean && (
              <Select
                {...field}
                size="lg"
                label="Value"
                color="default"
                variant="underlined"
                defaultSelectedKeys={[BOOLEANS.true]}
              >
                {Object.values(BOOLEANS).map((bool) => (
                  <SelectItem key={bool}>{bool}</SelectItem>
                ))}
              </Select>
            )}
          </Fragment>
        )}
      />
    </div>
  );
};

export default ValueTypeSelect;
