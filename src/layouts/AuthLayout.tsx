import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";

type Props = {
  mode: "protect" | "auth-pages";
};

const AuthLayout = ({ mode }: Props) => {
  const { userId } = useAuth();

  if (!userId && mode === "protect") {
    return <Navigate to="/sign-in" />;
  }

  if (userId && mode === "auth-pages") {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default AuthLayout;
