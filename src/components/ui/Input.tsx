import { ComponentProps, ElementRef, PropsWithChildren, forwardRef } from "react";

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
      errorMessage: [...(rest.classNames?.errorMessage || ""), "text-xs text-danger-400"],
    }}
  >
    {children}
  </Inpt>
));
export default Input;
