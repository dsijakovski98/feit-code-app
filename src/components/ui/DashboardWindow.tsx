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
        "rounded-xl border border-content1 bg-gradient-to-br from-background to-background/20 p-4 shadow-xl backdrop-blur-[6px]",
        className,
      )}
    >
      {children}
    </section>
  );
};
