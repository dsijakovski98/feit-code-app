import { PropsWithChildren } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import { Skeleton } from "@nextui-org/react";

type Props = {
  isLoaded?: boolean;
  className?: ClassValue;
} & PropsWithChildren;

export const DashboardWindow = ({ isLoaded = true, className = "", children }: Props) => {
  return (
    <Skeleton
      isLoaded={isLoaded}
      className={clsx("rounded-xl", className, "m-0 grid place-items-stretch p-0")}
    >
      <section
        className={clsx(
          "h-full rounded-xl border border-background/50 bg-background p-6 shadow-md",
          className,
        )}
      >
        {children}
      </section>
    </Skeleton>
  );
};
