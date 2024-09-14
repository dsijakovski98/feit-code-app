import { useLayoutEffect, useState } from "react";

export const useResponsive = () => {
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

  return { isMobile };
};
