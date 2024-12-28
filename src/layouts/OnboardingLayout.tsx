import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";

import { ROUTES } from "@/constants/routes";

type Props = {
  mode: "onboard" | "welcome";
};

const OnboardingLayout = ({ mode }: Props) => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const onboardingComplete = !!user.unsafeMetadata.onboardingComplete;

  // Pages that require onboarding completed
  if (mode === "onboard" && !onboardingComplete) {
    return <Navigate to={ROUTES.welcome} replace />;
  }

  // Welcome page - redirect if onboarding is complete
  if (mode === "welcome" && onboardingComplete) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};

export default OnboardingLayout;
