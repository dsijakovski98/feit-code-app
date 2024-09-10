import { useMemo } from "react";

import { useAuth } from "@clerk/clerk-react";
import { Button } from "@nextui-org/react";

import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { getHelpFeedbackUrl } from "@/utils";

const MiscMenu = () => {
  const { userData } = useFCUser();
  const { signOut } = useAuth();

  const helpFeedbackUrl = useMemo(() => getHelpFeedbackUrl(userData), [userData]);

  return (
    <ul className="mt-auto space-y-9">
      <SidebarItem href={ROUTES.profile} label="Profile" icon={<Icon name="profile" />} />

      <SidebarItem
        href={helpFeedbackUrl}
        target="_blank"
        label="Help & Feedback"
        icon={<Icon name="help" />}
      />

      <li>
        <Button
          radius="full"
          variant="light"
          color="default"
          disableRipple
          disableAnimation
          onPress={() => signOut({ redirectUrl: ROUTES.signIn })}
          className="group flex h-14 w-14 flex-col items-center gap-1 !bg-transparent *:transition-colors hover:text-danger focus:text-danger"
        >
          <div className="!h-12 !w-12 overflow-hidden rounded-full">
            <Icon name="logout" className="!-scale-x-[1]" />
          </div>
          <p className="max-w-[7ch] text-center font-quicksand text-sm font-semibold">Log out</p>
        </Button>
      </li>
    </ul>
  );
};

export default MiscMenu;
