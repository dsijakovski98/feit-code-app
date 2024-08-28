import { PropsWithChildren, createContext, useState } from "react";

import { UseState, UserType } from "@/types";

type OnboardingContext = {
  userState: UseState<UserType | null>;
};

export const OnboardingContext = createContext<OnboardingContext | null>(null);
OnboardingContext.displayName = "OnboardingContext";

const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const userState = useState<UserType | null>(null);

  const value: OnboardingContext = {
    userState,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export default OnboardingProvider;
