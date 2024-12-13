import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { PAGE_TITLES } from "@/constants/routes";

const PageWrapper = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const baseTitle = "FEIT Code";
    const pageTitle = PAGE_TITLES[pathname as keyof typeof PAGE_TITLES];

    if (pageTitle) {
      document.title = `${baseTitle} | ${pageTitle}`;
    }
  }, [pathname]);

  return <Outlet />;
};

export default PageWrapper;
