import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { UserType } from "@/types";

type Props = {
  type: UserType;
};

const UserTypeOnlyLayout = ({ type }: Props) => {
  const { userData } = useFCUser();

  if (!userData) {
    return null;
  }

  if (userData.type !== type) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};

export default UserTypeOnlyLayout;
