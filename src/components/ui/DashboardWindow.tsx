import { PropsWithChildren } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
} & PropsWithChildren;

export const DashboardWindow = ({ className = "", children }: Props) => {
  return (
    <section
      className={clsx(
        "rounded-xl border border-background/50 bg-background p-4 shadow-md",
        className,
      )}
    >
      {children}
    </section>
  );
};
