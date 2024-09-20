import { PropsWithChildren, createContext, useLayoutEffect, useState } from "react";

export const ResponsiveContext = createContext<{ isMobile: boolean } | null>(null);
ResponsiveContext.displayName = "ResponsiveContext";

export const ResponsiveProvider = ({ children }: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const listener = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", listener);
    listener();
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return <ResponsiveContext.Provider value={{ isMobile }}>{children}</ResponsiveContext.Provider>;
};
