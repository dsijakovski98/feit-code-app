import { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  step: number;
} & PropsWithChildren;

const OnboardingStep = ({ step, children }: Props) => {
  const { step: currentStep } = useCtx(OnboardingContext);

  return (
    <AnimatePresence>
      {step === currentStep && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingStep;
