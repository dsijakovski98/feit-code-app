import { useMemo } from "react";

import { Badge } from "@nextui-org/react";

import SidebarMenuSkeleton from "@/layouts/MainLayout/Sidebar/Menu/Skeleton";
import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import { useFeedbackCount } from "@/hooks/submission/useFeedbackCount";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE, UserType } from "@/types";

const menuLabel = (type: UserType, label: string) => (type === USER_TYPE.student ? label : `My ${label}`);

const SidebarMenu = () => {
  const { userData } = useFCUser();

  const { data: feedbackCount } = useFeedbackCount(userData?.user.id);
  const feedbacks = useMemo(() => {
    if (!feedbackCount) return null;

    return feedbackCount > 9 ? "9+" : feedbackCount;
  }, [feedbackCount]);

  if (!userData) {
    return <SidebarMenuSkeleton />;
  }

  return (
    <ul className="space-y-9 font-serif lg:flex lg:w-full lg:items-center lg:justify-evenly lg:space-y-0">
      <SidebarItem href={ROUTES.dashboard} label="Dashboard" icon={<Icon name="home" />} />

      <SidebarItem
        href={ROUTES.courses}
        label={menuLabel(userData.type, "Courses")}
        icon={<Icon name="course" />}
      />

      <Badge
        size="sm"
        color="success"
        isInvisible={!feedbacks}
        hidden={!feedbacks}
        content={feedbacks}
        classNames={{ base: "w-full lg:w-fit [&_li]:!w-full" }}
        className="aspect-square -translate-x-2 border-none font-sans font-semibold"
      >
        <SidebarItem
          href={ROUTES.exams}
          label={menuLabel(userData.type, "Exams")}
          icon={<Icon name="exam" />}
        />
      </Badge>
    </ul>
  );
};

export default SidebarMenu;
