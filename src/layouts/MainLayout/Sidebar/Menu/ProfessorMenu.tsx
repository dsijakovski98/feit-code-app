import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";

const ProfessorMenu = () => {
  return (
    <ul className="space-y-2">
      <SidebarItem href={ROUTES.dashboard} label="Dashboard" icon={<Icon name="home" />} />
      <SidebarItem href={ROUTES.courses} label="My Courses" icon={<Icon name="course" />} />
      <SidebarItem href={ROUTES.exams} label="My Exams" icon={<Icon name="exam" />} />
    </ul>
  );
};

export default ProfessorMenu;
