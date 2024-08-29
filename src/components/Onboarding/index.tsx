import { useEffect } from "react";

import { motion } from "framer-motion";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";
import ProfessorOnboarding from "@/components/Onboarding/Professor";
import StudentOnboarding from "@/components/Onboarding/Student";
import UserTypeSelector from "@/components/Onboarding/UserTypeSelect";
import GradientText from "@/components/ui/GradientText";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPES } from "@/types";

const Onboarding = () => {
  const {
    step,
    userState: [userType],
  } = useCtx(OnboardingContext);

  const { open, toggleOn } = useToggle();

  useEffect(() => {
    const timeout = setTimeout(() => {
      toggleOn();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [toggleOn]);

  return (
    <main className="grid min-h-dvh place-items-center bg-dots">
      <div className="flex flex-col items-center">
        <div className="flex w-fit max-w-40 drop-shadow-[0px_0px_4px_theme(colors.primary)]">
          <img src="/images/logo.svg" />
        </div>
        <h1 className="text-center text-6xl font-bold">
          Welcome to <GradientText>FEIT Code!</GradientText>
        </h1>
      </div>

      <Modal
        isOpen={open}
        backdrop="blur"
        placement="center"
        hideCloseButton
        classNames={{
          base: "min-w-[900px] lg:min-w-[90%] bg-transparent",
          header: "bg-background p-5",
          backdrop: "bg-primary-50/20",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex-col">
            <h2>Welcome aboard!</h2>
          </ModalHeader>
          <ModalBody
            as={motion.div}
            layout
            className="bg-gradient-to-br from-background to-background/60"
          >
            <OnboardingStep active={step === 0}>
              <UserTypeSelector />
            </OnboardingStep>

            <OnboardingStep active={step > 0}>
              {/* TODO: Opportunity for Suspense */}
              {userType === USER_TYPES.student ? <StudentOnboarding /> : <ProfessorOnboarding />}
            </OnboardingStep>
          </ModalBody>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Onboarding;
