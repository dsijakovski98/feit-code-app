import SidebarMenuSkeleton from "@/layouts/MainLayout/Sidebar/Menu/Skeleton";
import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE, UserType } from "@/types";

const menuLabel = (type: UserType, label: string) => (type === USER_TYPE.student ? label : `My ${label}`);

const SidebarMenu = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return <SidebarMenuSkeleton />;
  }

  return (
    <ul className="space-y-6 font-serif lg:flex lg:w-full lg:items-center lg:justify-evenly lg:space-y-0">
      <SidebarItem href={ROUTES.dashboard} label="Dashboard" icon={<Icon name="home" />} />

      <SidebarItem
        href={ROUTES.courses}
        label={menuLabel(userData.type, "Courses")}
        icon={<Icon name="course" />}
      />

      <SidebarItem
        href={ROUTES.exams}
        label={menuLabel(userData.type, "Exams")}
        icon={<Icon name="exam" />}
      />
    </ul>
  );
};

export default SidebarMenu;
