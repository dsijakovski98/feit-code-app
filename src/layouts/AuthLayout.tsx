import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";

import { ROUTES } from "@/constants/routes";

type Props = {
  mode: "protect" | "auth-pages";
};

const AuthLayout = ({ mode }: Props) => {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (mode === "protect" && !userId) {
    return <Navigate to={ROUTES.signIn} replace />;
  }

  if (mode === "auth-pages" && userId) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
