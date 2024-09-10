import { useAuth } from "@clerk/clerk-react";
import { Button } from "@nextui-org/react";

import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { HREF, ROUTES } from "@/constants/routes";

const MiscMenu = () => {
  const { signOut } = useAuth();

  return (
    <ul className="mt-auto space-y-9">
      <SidebarItem
        href={HREF.feitCode.contactUs}
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
