import { useMemo } from "react";

import { Badge } from "@heroui/badge";

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
    <ul className="flex flex-col items-center gap-y-9 font-serif lg:flex lg:w-full lg:flex-row lg:items-center lg:justify-evenly lg:space-y-0 lg:py-1">
      <SidebarItem href={ROUTES.dashboard} label="Dashboard" icon={<Icon name="home" />} />

      <SidebarItem
        href={ROUTES.courses}
        label={menuLabel(userData.type, "Courses")}
        icon={<Icon name="course" />}
      />

      <li>
        <Badge
          size="sm"
          isInvisible={!feedbacks}
          hidden={!feedbacks}
          content={feedbacks}
          classNames={{ base: "w-full lg:w-fit [&_li]:!w-full" }}
          className="aspect-square translate-x-1 border-none bg-success-400 font-sans font-semibold dark:bg-success-300"
        >
          <SidebarItem
            as="div"
            href={ROUTES.exams}
            label={menuLabel(userData.type, "Exams")}
            icon={<Icon name="exam" />}
          />
        </Badge>
      </li>
    </ul>
  );
};

export default SidebarMenu;
