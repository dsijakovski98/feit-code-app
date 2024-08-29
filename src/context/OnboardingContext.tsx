import { PropsWithChildren, createContext, useState } from "react";

import { MAJOR_TYPE } from "@/constants/students";
import { UseState, UserType } from "@/types";
import {
  StudentOnboardingBasicInfoSchema,
  StudentOnboardingMajorSchema,
} from "@/utils/formSchemas/onboarding/studentOnboarding";

type StudentForm = StudentOnboardingBasicInfoSchema & StudentOnboardingMajorSchema;

type OnboardingContext = {
  userState: UseState<UserType | null>;
  studentState: UseState<StudentForm>;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
};

export const OnboardingContext = createContext<OnboardingContext | null>(null);
OnboardingContext.displayName = "OnboardingContext";

const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const userState = useState<UserType | null>(null);

  const studentState = useState<StudentForm>({
    fullName: "",
    bio: "",
    indexNumber: "",
    indexYear: "",
    major: MAJOR_TYPE.KTI,
  });

  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <OnboardingContext.Provider value={{ userState, studentState, step, nextStep, prevStep }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
