import { createContext, useState } from "react";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";
import ProfessorBasicInfo from "@/components/Onboarding/Professor/ProfessorBasicInfo";
import ProfessorConfirm from "@/components/Onboarding/Professor/ProfessorConfirm";

import { MAJOR_TYPE } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE, UseState } from "@/types";
import { ProfessorOnboardingSchema } from "@/utils/schemas/onboarding/professorOnboarding";

export type ProfessorForm = ProfessorOnboardingSchema;

export const ProfessorOnboardingContext = createContext<UseState<ProfessorForm> | null>(null);
ProfessorOnboardingContext.displayName = "ProfessorOnboardingContext";

const ProfessorOnboarding = () => {
  const { step } = useCtx(OnboardingContext);

  const formState = useState<ProfessorForm>({
    fullName: "",
    department: MAJOR_TYPE.KTI,
    type: TEACHER_TYPE.professor,
  });

  return (
    <ProfessorOnboardingContext.Provider value={formState}>
      <OnboardingStep active={step === 1}>
        <ProfessorBasicInfo />
      </OnboardingStep>

      <OnboardingStep active={step === 2}>
        <ProfessorConfirm />
      </OnboardingStep>
    </ProfessorOnboardingContext.Provider>
  );
};

export default ProfessorOnboarding;
