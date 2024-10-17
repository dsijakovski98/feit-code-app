import { RadioGroup, RadioGroupProps } from "@nextui-org/radio";

import RadioSelect from "@/components/Onboarding/UserTypeSelect/RadioSelect";

import { INPUT_SELECT } from "@/constants/tests";

type Props = Pick<RadioGroupProps, "onValueChange">;

const InputsSelect = ({ onValueChange }: Props) => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-lg font-semibold">Inputs</p>
        <p>
          Tests can have <span className="font-semibold">0 or more</span> inputs. Do you need any?
        </p>
      </div>

      <RadioGroup
        onValueChange={onValueChange}
        classNames={{
          wrapper: "grid grid-cols-2 md:grid-cols-1 gap-4 w-full",
          description: "text-sm text-foreground-300 font-serif font-semibold mt-2",
        }}
      >
        <RadioSelect
          value={INPUT_SELECT.empty}
          description="Empty inputs test"
          classNames={{
            base: "h-auto p-2.5 pr-3.5",
            labelWrapper: "space-y-0.5",
            label: "text-base",
            description: "font-serif !font-light",
          }}
        >
          No Inputs
        </RadioSelect>

        <RadioSelect
          value={INPUT_SELECT.inputs}
          description="Test with 1 or more inputs"
          classNames={{
            base: "h-auto p-2.5 pr-3.5",
            labelWrapper: "space-y-0.5",
            label: "text-base",
            description: "font-serif !font-light",
          }}
        >
          Add Inputs
        </RadioSelect>
      </RadioGroup>
    </div>
  );
};

export default InputsSelect;
