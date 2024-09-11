import { Fragment } from "react";
import { Link } from "react-router-dom";

import SidebarMenu from "@/layouts/MainLayout/Sidebar/Menu";
import MiscMenu from "@/layouts/MainLayout/Sidebar/Menu/MiscMenu";

import { ROUTES } from "@/constants/routes";

const Sidebar = () => {
  return (
    <nav className="sticky top-0 flex h-dvh flex-col items-center gap-8 border-r border-r-content4 bg-gradient-to-b from-content1 to-background to-40% px-3 py-7 font-quicksand">
      <Link
        to={ROUTES.dashboard}
        className="flex w-fit max-w-14 transition-[filter] hover:drop-shadow-[0px_0px_1px_theme(colors.primary)] dark:hover:drop-shadow-[0px_0px_8px_theme(colors.primary)]"
      >
        <img src="/images/logo.svg" />
      </Link>

      <Fragment>
        <SidebarMenu />

        <MiscMenu />
      </Fragment>
    </nav>
  );
};

export default Sidebar;
