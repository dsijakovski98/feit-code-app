import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import Onboarding from "@/components/Onboarding";

import { ROUTES } from "@/constants/routes";
import OnboardingProvider from "@/context/OnboardingContext";
import { UserType } from "@/types";

const ONBOARDING_KEY = "fc-onboarding";

type OnboardingContext = {
  userTypeState: typeof useState<UserType>;
};

export const OnboardingContext = createContext<OnboardingContext | null>(null);

const WelcomePage = () => {
  const onboardingDone = !!Cookies.get(ONBOARDING_KEY);

  if (onboardingDone) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  );
};

export default WelcomePage;
