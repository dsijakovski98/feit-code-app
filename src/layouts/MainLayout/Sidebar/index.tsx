import LogoFC from "@/layouts/MainLayout/LogoFC";
import SidebarMenu from "@/layouts/MainLayout/Sidebar/Menu";
import MiscMenu from "@/layouts/MainLayout/Sidebar/Menu/MiscMenu";

const Sidebar = () => {
  return (
    <nav className="sticky top-0 flex h-dvh flex-col items-center gap-8 bg-primary-400 px-3 pb-8 pt-4 font-serif dark:bg-primary-50 lg:fixed lg:inset-x-0 lg:bottom-0 lg:top-[unset] lg:z-10 lg:h-auto lg:flex-row lg:items-center lg:pb-2 lg:pt-3 lg:dark:bg-[#131037]">
      <LogoFC className="mb-3 !brightness-150 lg:hidden" />

      <SidebarMenu />
      <MiscMenu />
    </nav>
  );
};

export default Sidebar;
