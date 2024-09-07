import Onboarding from "@/components/Onboarding";

import OnboardingProvider from "@/context/OnboardingContext";

const WelcomePage = () => {
  console.log("Welcome page");
  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  );
};

export default WelcomePage;
