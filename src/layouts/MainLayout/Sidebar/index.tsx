import { Fragment } from "react";
import { Link } from "react-router-dom";

import SidebarMenu from "@/layouts/MainLayout/Sidebar/Menu";
import MiscMenu from "@/layouts/MainLayout/Sidebar/Menu/MiscMenu";

import { ROUTES } from "@/constants/routes";

const Sidebar = () => {
  return (
    <nav className="sticky top-0 flex h-dvh flex-col items-center gap-8 bg-primary-400 px-3 pb-8 pt-4 font-quicksand dark:bg-primary-50/20">
      <Link
        to={ROUTES.dashboard}
        className="flex w-fit max-w-14 brightness-200 transition-[filter] hover:brightness-150 dark:brightness-100 dark:hover:drop-shadow-[0px_0px_8px_theme(colors.primary)]"
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
