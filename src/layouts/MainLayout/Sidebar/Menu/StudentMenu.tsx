import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";

const StudentMenu = () => {
  return (
    <ul className="space-y-9">
      <SidebarItem href={ROUTES.profile} label="Profile" icon={<Icon name="profile" />} />
      <SidebarItem href={ROUTES.courses} label="Courses" icon={<Icon name="course" />} />
      <SidebarItem href={ROUTES.exams} label="Exams" icon={<Icon name="exam" />} />
    </ul>
  );
};

export default StudentMenu;
