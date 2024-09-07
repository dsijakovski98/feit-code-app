import { Link } from "react-router-dom";

import SidebarMenu from "@/layouts/MainLayout/Sidebar/Menu";

import { ROUTES } from "@/constants/routes";

const Sidebar = () => {
  return (
    <nav className="flex h-full flex-col items-center gap-8 border-r border-r-content1 bg-gradient-to-b from-content1 to-background to-40% px-4 py-7">
      <Link
        to={ROUTES.dashboard}
        className="flex w-fit max-w-14 transition-shadow hover:drop-shadow-[0px_0px_4px_theme(colors.primary)]"
      >
        <img src="/images/logo.svg" />
      </Link>

      <SidebarMenu />
    </nav>
  );
};

export default Sidebar;
