import { useMemo } from "react";

import { ClassValue } from "clsx";
import clsx from "clsx";

import { useUser } from "@clerk/clerk-react";

import Icon from "@/components/ui/Icon";

type Props = {
  className?: ClassValue;
};

const AuthStrategyIcon = ({ className = "" }: Props) => {
  const { user } = useUser();

  const strategy = user?.primaryEmailAddress?.verification.strategy;

  const icon = useMemo(() => {
    if (!strategy) return null;

    if (strategy?.includes("google")) return "google";
    if (strategy?.includes("github")) return "github";

    return null;
  }, [strategy]);

  if (!icon) return null;

  return <Icon name={icon} className={clsx("h-7 w-7 drop-shadow-md dark:drop-shadow-none", className)} />;
};

export default AuthStrategyIcon;
