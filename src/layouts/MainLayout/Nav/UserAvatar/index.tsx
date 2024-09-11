import { useMemo } from "react";

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

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { getHelpFeedbackUrl } from "@/utils";

const UserAvatar = () => {
  const { userData } = useFCUser();
  const { signOut } = useAuth();

  const helpFeedbackUrl = useMemo(() => getHelpFeedbackUrl(userData), [userData]);

  if (!userData) return <UserAvatarSkeleton />;

  const {
    user: { avatarUrl, email },
  } = userData;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="cursor-pointer">
        <Avatar isBordered src={avatarUrl || ""} className="ring-foreground" />
      </DropdownTrigger>

      <DropdownMenu disabledKeys={["title"]}>
        <DropdownItem
          key="title"
          textValue="Title"
          className="mb-1 opacity-100 *:text-sm [&_span]:flex [&_span]:items-center [&_span]:gap-2"
        >
          <AuthStrategyIcon />

          <p>
            Signed in as <b className="block font-semibold">{email}</b>
          </p>
        </DropdownItem>

        <DropdownItem key="profile" textValue="Profile">
          <p className="text-sm font-semibold">Profile</p>
          <p className="text-xs text-content4-foreground">Edit your profile settings</p>
        </DropdownItem>

        <DropdownSection>
          <DropdownItem
            as="a"
            key="help"
            textValue="Help & Feedback"
            href={helpFeedbackUrl}
            target="_blank"
          >
            <p className="text-sm font-semibold">Help & Feedback</p>
            <p className="text-xs text-content4-foreground">Report an issue</p>
          </DropdownItem>

          <DropdownItem
            key="log-out"
            textValue="Log out"
            onClick={() => signOut({ redirectUrl: ROUTES.signIn })}
          >
            <p className="text-sm font-semibold">Log out</p>
            <p className="text-xs text-content4-foreground">Take a break</p>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
