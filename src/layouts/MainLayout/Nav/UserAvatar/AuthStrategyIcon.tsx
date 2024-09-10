import { useUser } from "@clerk/clerk-react";

import Icon from "@/components/ui/Icon";

const AuthStrategyIcon = () => {
  const { user } = useUser();

  if (!user) return null;

  if (!user.primaryEmailAddress) return null;

  if (user.primaryEmailAddress.verification.strategy?.includes("google")) {
    return <Icon name="google" className="h-8 w-8" />;
  }

  if (user.primaryEmailAddress.verification.strategy?.includes("github")) {
    return <Icon name="github" className="h-8 w-8" />;
  }

  return null;
};

export default AuthStrategyIcon;
