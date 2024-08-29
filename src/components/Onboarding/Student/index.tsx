import { createContext } from "react";
import { useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";

import { MAJOR_TYPE } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { StudentOnboardingSchema } from "@/utils/formSchemas/onboarding/studentOnboarding";

type StudentOnboardingContext = ReturnType<typeof useForm<StudentOnboardingSchema>>;

const StudentOnboardingContext = createContext<StudentOnboardingContext | null>(null);

const StudentOnboarding = () => {
  const { step } = useCtx(OnboardingContext);

  const form = useForm<StudentOnboardingSchema>({
    resolver: valibotResolver(StudentOnboardingSchema),
    defaultValues: {
      fullName: "",
      bio: "",
      indexNumber: 203,
      indexYear: new Date().getFullYear(),
      major: MAJOR_TYPE.KTI,
    },
  });

  return (
    <StudentOnboardingContext.Provider value={form}>
      <OnboardingStep active={step === 1}>Step 1</OnboardingStep>

      <OnboardingStep active={step === 2}>Step 2</OnboardingStep>
    </StudentOnboardingContext.Provider>
  );
};

export default StudentOnboarding;
