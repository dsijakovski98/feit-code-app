import { useState } from "react";

export const useToggle = (initial: boolean = false) => {
  const [open, setState] = useState(initial);

  const toggle = () => setState((prev) => !prev);

  const toggleOn = () => setState(true);
  const toggleOff = () => setState(false);

  return { open, toggle, toggleOn, toggleOff, set: setState };
};

export type UseToggle = ReturnType<typeof useToggle>;
