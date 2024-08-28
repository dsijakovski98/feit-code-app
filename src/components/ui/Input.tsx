import { ComponentProps, ElementRef, PropsWithChildren, forwardRef } from "react";

import clsx from "clsx";

import { Input as NextUiInput } from "@nextui-org/input";
import { extendVariants } from "@nextui-org/react";

const Inpt = extendVariants(NextUiInput, {
  variants: {
    size: {
      md: {
        base: "h-[70px]",
        inputWrapper: "h-[46px]",
        label: "group-data-[filled-within='true']:-translate-y-2",
      },
      lg: {
        base: "h-[88px]",
      },
    },
  },
});

type Props = ComponentProps<typeof Inpt> & PropsWithChildren;

const Input = forwardRef<ElementRef<typeof Inpt>, Props>(({ children, ...rest }, ref) => (
  <Inpt
    {...rest}
    ref={ref}
    classNames={{
      ...rest.classNames,
      errorMessage: clsx("text-sm text-danger-500", rest.classNames?.errorMessage || ""),
    }}
  >
    {children}
  </Inpt>
));
export default Input;
