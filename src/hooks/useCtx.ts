import { Context, useContext } from "react";

export const useCtx = <T,>(Context: Context<T>) => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error(`Please add a provider for "${Context.displayName}"!`);
  }

  return ctx;
};
