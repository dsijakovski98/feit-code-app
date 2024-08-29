import { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  active?: boolean;
} & PropsWithChildren;

const OnboardingStep = ({ active, children }: Props) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingStep;
