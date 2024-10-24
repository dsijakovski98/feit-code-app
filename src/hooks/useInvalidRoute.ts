import { useMemo } from "react";
import { useLocation } from "react-router-dom";

type Options = {
  tabKeys: string[];
};

export const useInvalidRoute = ({ tabKeys }: Options) => {
  const { hash } = useLocation();

  const invalidRoute = useMemo(() => {
    return !hash || !tabKeys.includes(hash);
  }, [hash, tabKeys]);

  return { invalidRoute };
};
