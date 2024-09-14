import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";

import PageFallback from "@/layouts/PageFallback";

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
    return <Navigate to={ROUTES.welcome} />;
  }

  // Welcome page - redirect if onboarding is complete
  if (mode === "welcome" && onboardingComplete) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  );
};

export default OnboardingLayout;
