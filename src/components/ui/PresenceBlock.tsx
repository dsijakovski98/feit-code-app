import { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
} & PropsWithChildren;

const PresenceBlock = ({ show, children }: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PresenceBlock;
