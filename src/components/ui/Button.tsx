import { type ComponentProps, ElementRef, type PropsWithChildren, forwardRef } from "react";

import clsx from "clsx";

import { Button as NextUiButton } from "@nextui-org/button";
import { extendVariants } from "@nextui-org/system";

const Btn = extendVariants(NextUiButton, {
  defaultVariants: {
    variant: "shadow",
    color: "primary",
    radius: "md",
  },
  variants: {
    variant: {
      shadow:
        "shadow-[0px_3px_2px_-3px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_0px_0px_rgba(0,0,0,0.12)]",
    },
    size: {
      sm: "text-xs",
    },
  },
});

type Props = ComponentProps<typeof Btn> & PropsWithChildren;

const Button = forwardRef<ElementRef<typeof Btn>, Props>(({ children, ...rest }, ref) => (
  <Btn
    {...rest}
    ref={ref}
    className={clsx(
      "!font-serif font-semibold disabled:!pointer-events-none disabled:shadow-none disabled:brightness-75",
      rest.className,
    )}
  >
    <span className="sr-only">{children}</span>
    {children}
  </Btn>
));

export default Button;
