import { Suspense, lazy } from "react";

import StudentMenu from "@/layouts/MainLayout/Sidebar/Menu/StudentMenu";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorMenu = lazy(() => import("@/layouts/MainLayout/Sidebar/Menu/ProfessorMenu"));
const SidebarMenuSkeleton = lazy(() => import("@/layouts/MainLayout/Sidebar/Menu/Skeleton"));

const SidebarMenu = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return <SidebarMenuSkeleton />;
  }

  return (
    <Suspense fallback={null}>
      {userData.type === USER_TYPE.student ? <StudentMenu /> : <ProfessorMenu />}
    </Suspense>
  );
};

export default SidebarMenu;
