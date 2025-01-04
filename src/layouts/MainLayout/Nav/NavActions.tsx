import { Divider } from "@nextui-org/divider";

import UserAvatar from "@/layouts/MainLayout/Nav/UserAvatar";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const NavActions = () => {
  return (
    <div className="flex -translate-x-0.5 items-center gap-4">
      <ThemeSwitcher />

      <Divider orientation="vertical" className="mr-2 block !h-10 w-px self-stretch" />

      <UserAvatar />
    </div>
  );
};

export default NavActions;
