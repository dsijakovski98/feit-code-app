import { createContext, useState } from "react";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";
import StudentBasicInfo from "@/components/Onboarding/Student/StudentBasicInfo";
import StudentConfirm from "@/components/Onboarding/Student/StudentConfirm";
import StudentMajor from "@/components/Onboarding/Student/StudentMajor";

import { MAJOR_TYPE } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { UseState } from "@/types";
import {
  StudentOnboardingBasicInfoSchema,
  StudentOnboardingMajorSchema,
} from "@/utils/schemas/onboarding/studentOnboarding";

export type StudentForm = StudentOnboardingBasicInfoSchema & StudentOnboardingMajorSchema;

export const StudentOnboardingContext = createContext<UseState<StudentForm> | null>(null);
StudentOnboardingContext.displayName = "StudentOnboardingContext";

const StudentOnboarding = () => {
  const { step } = useCtx(OnboardingContext);

  const studentState = useState<StudentForm>({
    fullName: "",
    bio: "",
    indexNumber: "",
    indexYear: "",
    major: MAJOR_TYPE.KTI,
  });

  return (
    <StudentOnboardingContext.Provider value={studentState}>
      <div className="max-h-[700px]">
        <OnboardingStep active={step === 1}>
          <StudentBasicInfo />
        </OnboardingStep>

        <OnboardingStep active={step === 2}>
          <StudentMajor />
        </OnboardingStep>

        <OnboardingStep active={step === 3}>
          <StudentConfirm />
        </OnboardingStep>
      </div>
    </StudentOnboardingContext.Provider>
  );
};

export default StudentOnboarding;
