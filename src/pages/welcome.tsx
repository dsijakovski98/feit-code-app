import Onboarding from "@/components/Onboarding";

import OnboardingProvider from "@/context/OnboardingContext";

const WelcomePage = () => {
  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  );
};

export default WelcomePage;
