import { useMemo } from "react";

import clsx, { ClassValue } from "clsx";

import { Skeleton } from "@nextui-org/skeleton";

import LogoFC from "@/layouts/MainLayout/LogoFC";
import NavActions from "@/layouts/MainLayout/Nav/NavActions";

import { useFCUser } from "@/hooks/useFCUser";
import { getDaytime, getTimeGreeting } from "@/utils";

type Props = {
  className?: ClassValue;
  hideDivider?: boolean;
};

const Nav = ({ className = "", hideDivider = false }: Props) => {
  const { userData } = useFCUser();

  const timestamp = useMemo(() => getDaytime(Date.now()), []);
  const timeGreeting = useMemo(
    () => (userData?.user.firstName ? getTimeGreeting(userData?.user.firstName) : ""),
    [userData?.user.firstName],
  );

  return (
    <header className={clsx("bg-main font-sans lg:pb-3", className)}>
      <nav
        className={clsx(
          "flex h-full items-center justify-between border-b border-b-foreground-50 px-8 py-4 lg:border-b-transparent lg:px-5 lg:pb-0",
          {
            "border-b-transparent": hideDivider,
          },
        )}
      >
        <div className="lg:hidden">
          <Skeleton isLoaded={!!timeGreeting} className="rounded-lg">
            <h1 className="min-h-7 text-xl font-semibold">{timeGreeting}</h1>
          </Skeleton>

          <time className="block text-foreground-300">{timestamp}</time>
        </div>

        <LogoFC className="hidden lg:flex" />

        <NavActions />
      </nav>
    </header>
  );
};

export default Nav;
