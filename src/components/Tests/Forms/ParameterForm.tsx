import { Fragment } from "react";
import { Control, Controller } from "react-hook-form";

import { Select, SelectItem } from "@nextui-org/select";

import Input from "@/components/ui/Input";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { InputValueType, VALUE_TYPE } from "@/constants/enums";
import { BOOLEANS } from "@/constants/tests";
import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  type: InputValueType;
  control: Control;
  name: string;
};

const ParameterForm = ({ type, control, name }: Props) => {
  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Fragment>
          {type === VALUE_TYPE.string && (
            <Input
              {...field}
              label={name}
              color="default"
              variant="underlined"
              placeholder="Any string..."
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "!text-foreground !text-lg font-semibold",
                input: "text-base",
              }}
            />
          )}

          {type === VALUE_TYPE.number && (
            <Input
              {...field}
              label={name}
              type="number"
              color="default"
              pattern="[0-9]+"
              inputMode="numeric"
              variant="underlined"
              placeholder="Any number..."
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "!text-foreground !text-lg font-semibold",
                input: "text-base",
              }}
            />
          )}

          {type === VALUE_TYPE.empty && (
            <Input
              {...field}
              readOnly
              label={name}
              color="default"
              variant="underlined"
              placeholder={`Empty value in ${language}`}
              value={LANGUAGES_CONFIG[language].emptyValue || "None"}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                input: "text-base font-mono !text-foreground-300",
                label: "!text-foreground !text-lg font-semibold",
              }}
            />
          )}

          {type === VALUE_TYPE.boolean && (
            <Select
              {...field}
              label={name}
              color="default"
              variant="underlined"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              defaultSelectedKeys={[BOOLEANS.true]}
              classNames={{
                label: "!text-foreground !text-lg font-semibold",
                value: "text-base font-mono",
              }}
            >
              {Object.values(BOOLEANS).map((bool) => (
                <SelectItem key={bool} title={bool} classNames={{ title: "font-mono" }} />
              ))}
            </Select>
          )}
        </Fragment>
      )}
    />
  );
};

export default ParameterForm;
