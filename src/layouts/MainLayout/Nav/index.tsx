import { useMemo } from "react";

import { Divider } from "@nextui-org/divider";
import { Skeleton } from "@nextui-org/react";

import LogoFC from "@/layouts/MainLayout/LogoFC";
import NotificationsMenu from "@/layouts/MainLayout/Nav/NotificationsMenu";
import UserAvatar from "@/layouts/MainLayout/Nav/UserAvatar";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import { useFCUser } from "@/hooks/useFCUser";
import { getDaytime, getTimeGreeting } from "@/utils";

const Nav = () => {
  const { userData } = useFCUser();

  const timestamp = useMemo(() => getDaytime(Date.now()), []);
  const timeGreeting = useMemo(
    () => (userData?.user.firstName ? getTimeGreeting(userData?.user.firstName) : ""),
    [userData?.user.firstName],
  );

  return (
    <header className="bg-main font-sans">
      <nav className="mx-8 flex h-full items-center justify-between border-b border-b-foreground-50 py-4 lg:mx-5 lg:border-b-transparent lg:pb-0">
        <div className="lg:hidden">
          <Skeleton isLoaded={!!timeGreeting} className="rounded-lg">
            <h1 className="min-h-7 text-xl font-semibold">{timeGreeting}</h1>
          </Skeleton>

          <time className="block text-foreground-300">{timestamp}</time>
        </div>

        <LogoFC className="hidden lg:flex" />

        <div className="flex -translate-x-0.5 items-center gap-4">
          <div className="space-x-2 lg:space-x-1">
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
