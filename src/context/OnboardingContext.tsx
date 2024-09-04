import { PropsWithChildren, createContext, useState } from "react";

import { UseState, UserType } from "@/types";

type OnboardingContext = {
  userState: UseState<UserType | null>;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
};

export const OnboardingContext = createContext<OnboardingContext | null>(null);
OnboardingContext.displayName = "OnboardingContext";

const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const userState = useState<UserType | null>(null);

  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <OnboardingContext.Provider value={{ userState, step, nextStep, prevStep }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
