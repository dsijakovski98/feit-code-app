import { Suspense, lazy, useEffect } from "react";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/react";

import OnboardingStep from "@/components/Onboarding/OnboardingStep";
import UserTypeSelector from "@/components/Onboarding/UserTypeSelect";
import GradientText from "@/components/ui/GradientText";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";

const ProfessorOnboarding = lazy(() => import("@/components/Onboarding/Professor"));
const StudentOnboarding = lazy(() => import("@/components/Onboarding/Student"));

const Onboarding = () => {
  const {
    step,
    userState: [userType],
  } = useCtx(OnboardingContext);

  const { open, toggleOn } = useToggle();

  useEffect(() => {
    const timeout = setTimeout(() => {
      toggleOn();
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [toggleOn]);

  return (
    <main className="grid min-h-dvh place-items-center bg-dots-light dark:bg-dots-dark">
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
          base: "min-w-[720px] lg:min-w-[90%] bg-transparent",
          header: "bg-background p-5",
          backdrop: "bg-primary-50/20",
        }}
      >
        <ModalContent>
          <ModalHeader className="items-center justify-between">
            <h2>Welcome aboard!</h2>
            <ThemeSwitcher />
          </ModalHeader>

          <ModalBody className="bg-gradient-to-br from-background to-background/60">
            <OnboardingStep active={step === 0}>
              <UserTypeSelector />
            </OnboardingStep>

            <OnboardingStep active={step > 0}>
              <Suspense fallback={<Spinner className="mx-auto w-full" />}>
                {userType === USER_TYPE.student ? <StudentOnboarding /> : <ProfessorOnboarding />}
              </Suspense>
            </OnboardingStep>
          </ModalBody>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Onboarding;
