import { Fragment } from "react/jsx-runtime";

import { useAuth } from "@clerk/clerk-react";

import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { HREF, ROUTES } from "@/constants/routes";

const StudentMenu = () => {
  const { signOut } = useAuth();

  return (
    <Fragment>
      <ul className="mb-auto space-y-9">
        <SidebarItem href={ROUTES.profile} label="Profile" icon={<Icon name="profile" />} />
        <SidebarItem href={ROUTES.courses} label="Courses" icon={<Icon name="course" />} />
        <SidebarItem href={ROUTES.exams} label="Exams" icon={<Icon name="exam" />} />
      </ul>

      <ul className="space-y-9">
        <SidebarItem
          href={HREF.feitCode.contactUs}
          target="_blank"
          label="Help & Feedback"
          icon={<Icon name="help" />}
          className="hover:text-warning focus:text-warning"
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
              <Icon name="logout" />
            </div>
            <p className="max-w-[7ch] text-center text-sm font-normal">Log out</p>
          </Button>
        </li>
      </ul>
    </Fragment>
  );
};

export default StudentMenu;
