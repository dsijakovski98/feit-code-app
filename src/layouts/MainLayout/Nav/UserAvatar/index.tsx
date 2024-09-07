import { useAuth } from "@clerk/clerk-react";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import AuthStrategyIcon from "@/layouts/MainLayout/Nav/UserAvatar/AuthStrategyIcon";
import UserAvatarSkeleton from "@/layouts/MainLayout/Nav/UserAvatar/Skeleton";

import { HREF, ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";

const UserAvatar = () => {
  const { userData } = useFCUser();
  const { signOut } = useAuth();

  if (!userData) return <UserAvatarSkeleton />;

  const {
    fcUser: { avatarUrl, email },
  } = userData;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="cursor-pointer">
        <Avatar
          isBordered
          classNames={{ base: "!ring-slate-300 w-12 h-12" }}
          src={avatarUrl || ""}
        />
      </DropdownTrigger>
      <DropdownMenu disabledKeys={["title"]}>
        <DropdownItem
          key="title"
          className="mb-1 opacity-100 *:text-sm [&_span]:flex [&_span]:items-center [&_span]:gap-2"
        >
          <AuthStrategyIcon />

          <p>
            Signed in as <b className="block font-semibold">{email}</b>
          </p>
        </DropdownItem>

        <DropdownItem key="profile">
          <p className="text-sm font-semibold">Profile</p>
          <p className="text-xs text-slate-300">Edit your profile settings</p>
        </DropdownItem>

        <DropdownSection>
          <DropdownItem key="help" as="a" href={HREF.feitCode.contactUs} target="_blank">
            <p className="text-sm font-semibold">Help & Feedback</p>
            <p className="text-xs text-slate-300">Report an issue</p>
          </DropdownItem>

          <DropdownItem key="log-out" onClick={() => signOut({ redirectUrl: ROUTES.signIn })}>
            <p className="text-sm font-semibold">Log out</p>
            <p className="text-xs text-slate-300">Take a break</p>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
