import type { PropsWithChildren } from "react";

import clsx from "clsx";

import type { As } from "@nextui-org/react";

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
        variant === "primary" ? "bg-gradient-to-br" : "bg-gradient-to-tr",
        className,
      )}
    >
      {children}
    </Element>
  );
};

export default GradientText;
