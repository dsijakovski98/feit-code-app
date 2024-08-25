import { useContext } from "react";

import { WindowContext } from "@/components/ui/Window";

export const useWindowContext = () => {
  const ctx = useContext(WindowContext);

  if (!ctx) {
    throw new Error("Please add WindowContext provider!");
  }

  return ctx;
};
