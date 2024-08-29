import OnboardingStep from "@/components/Onboarding/OnboardingStep";
import StudentBasicInfo from "@/components/Onboarding/Student/StudentBasicInfo";
import StudentMajor from "@/components/Onboarding/Student/StudentMajor";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";

const StudentOnboarding = () => {
  const { step } = useCtx(OnboardingContext);

  return (
    <div className="max-h-[700px]">
      <OnboardingStep active={step === 1}>
        <StudentBasicInfo />
      </OnboardingStep>

      <OnboardingStep active={step === 2}>
        <StudentMajor />
      </OnboardingStep>
    </div>
  );
};

export default StudentOnboarding;
