import clsx from "clsx";

import { Radio, RadioProps } from "@nextui-org/react";

type Props = RadioProps;

const RadioSelect = ({ children, ...props }: Props) => {
  return (
    <Radio
      {...props}
      classNames={{
        base: clsx(
          "inline-flex max-w-full basis-full bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        labelWrapper: "space-y-2",
        label: "text-lg font-semibold",
        description: "font-light text-gray-400 text-sm",
      }}
    >
      {children}
    </Radio>
  );
};

export default RadioSelect;
