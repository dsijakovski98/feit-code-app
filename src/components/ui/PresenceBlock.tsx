import { ComponentProps, PropsWithChildren, useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
  mode?: "slide" | "appear";
} & PropsWithChildren;

type AnimateProps = Required<Pick<ComponentProps<typeof motion.div>, "initial" | "animate" | "exit">>;

const slideProps: AnimateProps = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const appearProps: AnimateProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PresenceBlock = ({ show, mode = "slide", children }: Props) => {
  const animateProps = useMemo<AnimateProps>(() => (mode === "slide" ? slideProps : appearProps), [mode]);

  return <AnimatePresence>{show && <motion.div {...animateProps}>{children}</motion.div>}</AnimatePresence>;
};

export default PresenceBlock;
