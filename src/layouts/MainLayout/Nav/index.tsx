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
    <header className="bg-content1 px-8 py-4 font-sans dark:bg-default-100/50 lg:bg-primary lg:px-5 lg:py-2.5">
      <nav className="flex items-center justify-between">
        <div className="lg:hidden">
          <Skeleton isLoaded={!!timeGreeting} className="min-h-8 rounded-lg">
            <h1 className="text-2xl font-semibold">{timeGreeting}</h1>
          </Skeleton>
          <time>{timestamp}</time>
        </div>

        <LogoFC className="hidden lg:flex" />

        <div className="flex -translate-x-0.5 items-center gap-4">
          <div className="space-x-2">
            <ThemeSwitcher />

            <NotificationsMenu />
          </div>

          <Divider
            orientation="vertical"
            className="mr-2 block !h-10 w-px self-stretch dark:bg-foreground lg:bg-background"
          />

          <UserAvatar />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
