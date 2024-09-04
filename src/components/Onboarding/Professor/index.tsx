import { createContext } from "react";
import { useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";

import { TEACHER_TYPE } from "@/constants/professors";
import { MAJOR_TYPE } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { ProfessorOnboardingSchema } from "@/utils/formSchemas/onboarding/professorOnboarding";

type ProfessorOnboardingContext = ReturnType<typeof useForm<ProfessorOnboardingSchema>>;

const ProfessorOnboardingContext = createContext<ProfessorOnboardingContext | null>(null);
ProfessorOnboardingContext.displayName = "ProfessorOnboardingContext";

const ProfessorOnboarding = () => {
  const { step } = useCtx(OnboardingContext);

  const form = useForm<ProfessorOnboardingSchema>({
    resolver: valibotResolver(ProfessorOnboardingSchema),
    defaultValues: {
      fullName: "",
      type: TEACHER_TYPE.teacher,
      department: MAJOR_TYPE.KTI,
    },
  });

  return (
    <ProfessorOnboardingContext.Provider value={form}>
      <OnboardingStep active={step === 1}>Step 1</OnboardingStep>

      <OnboardingStep active={step === 2}>Step 2</OnboardingStep>
    </ProfessorOnboardingContext.Provider>
  );
};

export default ProfessorOnboarding;
