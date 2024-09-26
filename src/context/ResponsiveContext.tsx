import { PropsWithChildren, createContext, useLayoutEffect, useState } from "react";

export const ResponsiveContext = createContext<{ isMobile: boolean; isMobileSm: boolean } | null>(null);
ResponsiveContext.displayName = "ResponsiveContext";

export const ResponsiveProvider = ({ children }: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSm, setIsMobileSm] = useState(false);

  useLayoutEffect(() => {
    const listener = () => {
      setIsMobile(window.innerWidth < 1024);

      setIsMobileSm(window.innerWidth < 670);
    };

    window.addEventListener("resize", listener);
    listener();
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return <ResponsiveContext.Provider value={{ isMobile, isMobileSm }}>{children}</ResponsiveContext.Provider>;
};
