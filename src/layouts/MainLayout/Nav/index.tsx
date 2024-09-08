import { useMemo } from "react";

import { Divider } from "@nextui-org/divider";

import NotificationsMenu from "@/layouts/MainLayout/Nav/NotificationsMenu";
import UserAvatar from "@/layouts/MainLayout/Nav/UserAvatar";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import { useFCUser } from "@/hooks/useFCUser";
import { getDaytime, getTimeGreeting } from "@/utils";

const Nav = () => {
  const { userData } = useFCUser();

  const timestamp = useMemo(() => getDaytime(), []);
  const timeGreeting = useMemo(() => getTimeGreeting(), []);

  return (
    <header className="bg-gradient-to-r from-transparent to-primary/80 p-8 pb-40 font-quicksand">
      <nav className="flex items-center justify-between">
        <div>
          {userData && (
            <h1 className="text-2xl font-semibold">
              {timeGreeting}, {userData.fcUser.firstName}
            </h1>
          )}
          <time>{timestamp}</time>
        </div>

        <div className="flex items-center gap-4">
          <div className="space-x-2">
            <ThemeSwitcher />

            <NotificationsMenu />
          </div>

          <Divider orientation="vertical" className="debug mr-2 block !h-10 w-px self-stretch" />

          <UserAvatar />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
