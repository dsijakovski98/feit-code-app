import type { PropsWithChildren } from "react";

import clsx from "clsx";

import type { As } from "@nextui-org/system";

type Props = {
  as?: As;
  className?: string;
  variant?: "primary" | "secondary";
} & PropsWithChildren;

const GradientText = ({
  as: componentType = "span",
  className = "",
  variant = "primary",
  children,
}: Props) => {
  const Element = componentType;

  return (
    <Element
      className={clsx(
        "bg-clip-text text-transparent",
        variant === "primary"
          ? "bg-gradient-to-br from-primary-700 to-secondary-300"
          : "bg-gradient-to-tr from-secondary-200 to-secondary-400",
        className,
      )}
    >
      {children}
    </Element>
  );
};

export default GradientText;
