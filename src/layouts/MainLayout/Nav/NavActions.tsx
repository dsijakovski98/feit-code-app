import { Divider } from "@nextui-org/react";

import NotificationsMenu from "@/layouts/MainLayout/Nav/NotificationsMenu";
import UserAvatar from "@/layouts/MainLayout/Nav/UserAvatar";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const NavActions = () => {
  return (
    <div className="flex -translate-x-0.5 items-center gap-4">
      <div className="space-x-2 lg:space-x-1">
        <ThemeSwitcher />

        <NotificationsMenu />
      </div>

      <Divider orientation="vertical" className="mr-2 block !h-10 w-px self-stretch" />

      <UserAvatar />
    </div>
  );
};

export default NavActions;
