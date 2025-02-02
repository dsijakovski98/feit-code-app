import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { TeacherType, USER_TYPE } from "@/types";

type Props = {
  type: TeacherType;
};

const TeacherTypeOnlyLayout = ({ type }: Props) => {
  const { userData } = useFCUser();

  if (!userData) {
    return null;
  }

  if (userData.type !== USER_TYPE.professor) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  if (userData.user.type !== type) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};

export default TeacherTypeOnlyLayout;
