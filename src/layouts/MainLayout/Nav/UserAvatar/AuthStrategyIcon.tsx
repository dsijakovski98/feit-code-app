import { ClassValue } from "clsx";
import clsx from "clsx";

import { useUser } from "@clerk/clerk-react";

import Icon from "@/components/ui/Icon";

type Props = {
  className?: ClassValue;
};

const AuthStrategyIcon = ({ className = "" }: Props) => {
  const { user } = useUser();

  if (!user) return null;

  if (!user.primaryEmailAddress) return null;

  if (user.primaryEmailAddress.verification.strategy?.includes("google")) {
    return <Icon name="google" className={clsx("h-8 w-8", className)} />;
  }

  if (user.primaryEmailAddress.verification.strategy?.includes("github")) {
    return <Icon name="github" className={clsx("h-8 w-8", className)} />;
  }

  return null;
};

export default AuthStrategyIcon;
