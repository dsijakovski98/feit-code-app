import { PropsWithChildren, useMemo } from "react";

import clsx, { ClassValue } from "clsx";

import { Tooltip } from "@nextui-org/react";

import { DashboardWindow } from "@/components/ui/DashboardWindow";
import Icon from "@/components/ui/Icon";

import { parseStatValue } from "@/utils";

type Props = {
  label: string;
  value?: "-" | number | null;
  icon: string;
  description: string;
  variant?: "default" | "highlight";
  className?: ClassValue;
} & PropsWithChildren;

const StatCard = ({
  label,
  value,
  description,
  icon,
  variant = "default",
  className = "",
  children,
}: Props) => {
  const isLoaded = useMemo(() => !!value || value === 0, [value]);
  const statValue = useMemo(() => (value ? parseStatValue(value) : 0), [value]);

  return (
    <DashboardWindow
      isLoaded={isLoaded || !!children}
      className={clsx(
        "min-h-[118px] px-4 py-3 text-primary dark:text-foreground",
        {
          "bg-primary !text-background dark:bg-foreground": variant === "highlight",
        },
        className,
      )}
    >
      <div className="flex h-full items-start justify-between gap-4">
        <div className="flex h-full flex-1 flex-col justify-between gap-2">
          <Tooltip content={description} classNames={{ content: "font-sans text-base" }}>
            <div className="flex items-center gap-1.5">
              <p className="font-semibold">{label}</p>
              <Icon name="info" className="h-4 w-4" />
            </div>
          </Tooltip>

          {children || <p className="pb-2 font-sans text-5xl font-semibold md:text-4xl">{statValue}</p>}
        </div>

        <Icon name={icon} className="h-9 w-9 md:h-8 md:w-8" />
      </div>
    </DashboardWindow>
  );
};

export default StatCard;
