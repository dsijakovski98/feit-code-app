import clsx from "clsx";

import { Switch } from "@nextui-org/switch";

import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";

const TestInputsToggle = () => {
  const { withInputs: hasInputs } = useCtx(TestFormContext);

  return (
    <Switch
      isSelected={hasInputs.open}
      onValueChange={hasInputs.set}
      classNames={{
        base: clsx(
          "inline-flex flex-row-reverse w-full border-2 border-default-200 p-4 max-w-full bg-content1 items-center",
          "justify-between cursor-pointer rounded-lg gap-8",
          "data-[selected]:rounded-b-none data-[selected]:border-b-transparent",
        ),
        wrapper: "p-0 h-4 overflow-visible",
        thumb: clsx(
          "w-6 h-6 border-2 shadow-lg",
          "group-data-[hover=true]:border-primary",
          //selected
          "group-data-[selected=true]:ml-6",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-4",
        ),
      }}
    >
      <div className="space-y-1">
        <p className="font-semibold">Enable Inputs</p>
        <p className="text-sm text-foreground-200">
          Tasks can have up to <span className="font-sans font-semibold">4</span> inputs
        </p>
      </div>
    </Switch>
  );
};

export default TestInputsToggle;
