import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";

import AuthStrategyIcon from "@/layouts/MainLayout/Nav/UserAvatar/AuthStrategyIcon";
import UserAvatarSkeleton from "@/layouts/MainLayout/Nav/UserAvatar/Skeleton";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { useLogout } from "@/hooks/useLogout";
import { getHelpFeedbackUrl } from "@/utils";

const UserAvatar = () => {
  const { userData } = useFCUser();
  const { logOut } = useLogout();
  const navigate = useNavigate();

  const helpFeedbackUrl = useMemo(() => getHelpFeedbackUrl(userData), [userData]);

  if (!userData) return <UserAvatarSkeleton />;

  const { email, avatarUrl } = userData.user;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="cursor-pointer focus:ring-primary" tabIndex={0}>
        <Avatar
          isBordered
          src={avatarUrl || ""}
          className="-ring-offset-1 ring-foreground lg:h-9 lg:w-9 lg:ring-foreground"
        />
      </DropdownTrigger>

      <DropdownMenu disabledKeys={["title"]} closeOnSelect>
        <DropdownItem
          key="title"
          textValue="Title"
          className="mb-1f opacity-100 *:text-sm [&_span]:flex [&_span]:items-center [&_span]:gap-2"
        >
          <AuthStrategyIcon />

          <p className="font-sans">
            Signed in as <b className="block font-semibold">{email}</b>
          </p>
        </DropdownItem>

        <DropdownItem
          key="profile"
          onClick={() => navigate(ROUTES.profile)}
          textValue="Profile"
          className="font-serif"
        >
          <p className="text-sm font-semibold">Profile</p>
          <p className="text-xs text-content4-foreground">Edit your profile settings</p>
        </DropdownItem>

        <DropdownSection>
          <DropdownItem key="help" textValue="Help & Feedback" className="font-serif">
            <Link to={helpFeedbackUrl} target="_blank">
              <p className="text-sm font-semibold">Help & Feedback</p>
              <p className="text-xs text-content4-foreground">Report an issue</p>
            </Link>
          </DropdownItem>

          <DropdownItem key="sign-out" textValue="Sign out" onClick={() => logOut()} className="font-serif">
            <p className="text-sm font-semibold">Sign out</p>
            <p className="text-xs text-content4-foreground">Take a break</p>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
