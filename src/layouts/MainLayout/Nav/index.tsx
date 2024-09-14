import { useMemo } from "react";

import { Divider } from "@nextui-org/divider";

import LogoFC from "@/layouts/MainLayout/LogoFC";
import NotificationsMenu from "@/layouts/MainLayout/Nav/NotificationsMenu";
import UserAvatar from "@/layouts/MainLayout/Nav/UserAvatar";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import { useFCUser } from "@/hooks/useFCUser";
import { getDaytime, getTimeGreeting } from "@/utils";

const Nav = () => {
  const { userData } = useFCUser();

  const timestamp = useMemo(() => getDaytime(), []);
  const timeGreeting = useMemo(
    () => getTimeGreeting(userData?.user.firstName ?? ""),
    [userData?.user.firstName],
  );

  return (
    <header className="bg-content2 px-8 py-4 font-quicksand dark:bg-primary-50/70 lg:py-3">
      <nav className="flex items-center justify-between">
        <div className="lg:hidden">
          <h1 className="text-2xl font-semibold">{timeGreeting}</h1>
          <time>{timestamp}</time>
        </div>

        <LogoFC className="hidden brightness-75 lg:flex" />

        <div className="flex items-center gap-4">
          <div className="space-x-2">
            <ThemeSwitcher />

            <NotificationsMenu />
          </div>

          <Divider orientation="vertical" className="mr-2 block !h-10 w-px self-stretch" />

          <UserAvatar />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
