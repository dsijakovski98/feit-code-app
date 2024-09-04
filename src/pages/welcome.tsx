import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import { useAuth } from "@clerk/clerk-react";

import Onboarding from "@/components/Onboarding";

import { ROUTES } from "@/constants/routes";
import OnboardingProvider from "@/context/OnboardingContext";
import { getOnboardingKey } from "@/utils";

const WelcomePage = () => {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return null;

  const onboardingDone = !!Cookies.get(getOnboardingKey(userId!));

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
