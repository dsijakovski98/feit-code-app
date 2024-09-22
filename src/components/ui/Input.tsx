import { ComponentProps, ElementRef, PropsWithChildren, forwardRef } from "react";

import clsx from "clsx";

import { Input as NextUiInput } from "@nextui-org/input";
import { extendVariants } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { useToggle } from "@/hooks/useToggle";

const Inpt = extendVariants(NextUiInput, {
  variants: {
    size: {
      md: {
        base: "h-[70px]",
        inputWrapper: "h-[46px]",
        label: "group-data-[filled-within='true']:-translate-y-2 lg:text-base",
      },
      lg: {
        base: "h-[88px]",
        label: "text-lg",
      },
    },
  },
});

type Props = ComponentProps<typeof Inpt> & PropsWithChildren;

const Input = forwardRef<ElementRef<typeof Inpt>, Props>(({ children, ...rest }, ref) => {
  const visible = useToggle();

  return (
    <Inpt
      {...rest}
      ref={ref}
      className="!font-serif"
      classNames={{
        ...rest.classNames,
        label: clsx(
          "!font-medium group-data-[filled-within]:!font-semibold !text-current",
          rest.classNames?.label || "",
        ),
        errorMessage: clsx("text-sm text-danger-500", rest.classNames?.errorMessage || ""),
        input: clsx(
          "placeholder:font-light placeholder:text-foreground-300 placeholder:font-sans font-medium",
          rest.classNames?.input || "",
          {
            "!font-sans": rest.inputMode === "numeric",
          },
        ),
      }}
      endContent={
        rest.type === "password" ? (
          <Button
            isIconOnly
            color="default"
            size="sm"
            variant="light"
            radius="full"
            disableRipple
            disableAnimation
            tabIndex={-1} // Better UX when tabbing across inputs in a form
            onPress={visible.toggle}
            aria-label={`${visible.open ? "Hide" : "Show"} password`}
            className={clsx("p-1.5 [&_svg]:brightness-50", {
              "opacity-100": visible.open,
            })}
          >
            {visible.open ? <Icon name="eye-off" /> : <Icon name="eye" />}
          </Button>
        ) : (
          (rest.endContent ?? null)
        )
      }
      type={rest.type === "password" ? (visible.open ? "text" : "password") : rest.type}
    >
      {children}
    </Inpt>
  );
});
export default Input;
