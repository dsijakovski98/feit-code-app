import PageMeta from "@/layouts/PageMeta";

import Onboarding from "@/components/Onboarding";

import OnboardingProvider from "@/context/OnboardingContext";

const WelcomePage = () => {
  return (
    <OnboardingProvider>
      <PageMeta
        title="FEIT Code | Welcome"
        description="Welcome to FEIT Code! Let's create your profile, shall we?"
      />

      <Onboarding />
    </OnboardingProvider>
  );
};

export default WelcomePage;
