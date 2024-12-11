import { useMemo } from "react";

import { Button } from "@nextui-org/react";

import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { useLogout } from "@/hooks/useLogout";
import { getHelpFeedbackUrl } from "@/utils";

const MiscMenu = () => {
  const { userData } = useFCUser();
  const { logOut } = useLogout();

  const helpFeedbackUrl = useMemo(() => getHelpFeedbackUrl(userData), [userData]);

  return (
    <ul className="mt-auto space-y-9 lg:hidden">
      <SidebarItem href={ROUTES.profile} label="Profile" icon={<Icon name="profile" />} />

      <SidebarItem
        href={helpFeedbackUrl}
        target="_blank"
        label="Help & Feedback"
        icon={<Icon name="help" />}
      />

      <li>
        <Button
          variant="light"
          color="default"
          disableRipple
          disableAnimation
          onPress={() => logOut()}
          className="group flex h-14 w-14 flex-col items-center gap-1 !bg-transparent data-[focus-visible]:!outline-background data-[focus]:outline-transparent dark:data-[focus-visible]:!outline-foreground"
        >
          <div className="!h-12 !w-12 overflow-hidden rounded-full text-primary-foreground transition-colors group-hover:text-black group-focus:text-black dark:group-hover:text-primary-500 dark:group-focus:text-primary-500">
            <Icon name="logout" className="!-scale-x-[1]" />
          </div>
          <p className="max-w-[7ch] text-center text-sm font-semibold text-primary-foreground transition-colors group-hover:text-black group-focus:text-black dark:group-hover:text-primary-500 dark:group-focus:text-primary-500">
            Sign out
          </p>
        </Button>
      </li>
    </ul>
  );
};

export default MiscMenu;
