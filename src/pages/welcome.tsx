import { Helmet } from "react-helmet";

import Onboarding from "@/components/Onboarding";

import OnboardingProvider from "@/context/OnboardingContext";

const WelcomePage = () => {
  return (
    <OnboardingProvider>
      <Helmet>
        <title>FEIT Code | Welcome</title>
        <meta name="description" content="Welcome to FEIT Code! Let's create your profile, shall we?" />
      </Helmet>

      <Onboarding />
    </OnboardingProvider>
  );
};

export default WelcomePage;
