import { ComponentProps, PropsWithChildren } from "react";

import clsx, { ClassValue } from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type Props = { containerClass?: ClassValue; icon: string } & ComponentProps<typeof Button> &
  PropsWithChildren;

const FloatButton = ({ children, icon, containerClass = "", ...rest }: Props) => {
  return (
    <div className={clsx("fixed bottom-8 right-8 w-fit", containerClass)}>
      <Button
        {...rest}
        size={rest.size ?? "lg"}
        color={rest.color ?? "primary"}
        className={clsx(
          "grid !min-w-0 grid-cols-[auto_0fr] gap-0 overflow-hidden rounded-full px-3 !transition-all hover:grid-cols-[auto_1fr] hover:gap-2 hover:px-6 focus:grid-cols-[auto_1fr] focus:gap-2 focus:px-6",
          rest.className,
        )}
        startContent={
          rest.startContent ?? (
            <Icon
              name={icon}
              className="h-6 w-6 transition-size group-hover:h-7 group-hover:w-7 group-hover:-translate-x-1.5 group-focus:h-7 group-focus:w-7 group-focus:-translate-x-1.5"
            />
          )
        }
      >
        <span className="min-w-0 overflow-hidden transition-[visibility] [visibility:hidden] group-hover:visible group-focus:visible">
          {children}
        </span>
      </Button>
    </div>
  );
};

export default FloatButton;
