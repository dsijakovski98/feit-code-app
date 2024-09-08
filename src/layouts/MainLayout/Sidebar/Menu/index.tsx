import { Suspense } from "react";

import ProfessorMenu from "@/layouts/MainLayout/Sidebar/Menu/ProfessorMenu";
import SidebarMenuSkeleton from "@/layouts/MainLayout/Sidebar/Menu/Skeleton";
import StudentMenu from "@/layouts/MainLayout/Sidebar/Menu/StudentMenu";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPES } from "@/types";

const SidebarMenu = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return <SidebarMenuSkeleton />;
  }

  return (
    <Suspense fallback={null}>
      {userData.type === USER_TYPES.student ? <StudentMenu /> : <ProfessorMenu />}
    </Suspense>
  );
};

export default SidebarMenu;
