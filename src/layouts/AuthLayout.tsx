import { Navigate, Outlet } from "react-router-dom";

import Cookies from "js-cookie";

import { useAuth } from "@clerk/clerk-react";

import { ROUTES } from "@/constants/routes";
import { getOnboardingKey } from "@/utils";

type Props = {
  mode: "protect" | "auth-pages";
};

const AuthLayout = ({ mode }: Props) => {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!userId && mode === "protect") {
    return <Navigate to={ROUTES.signIn} />;
  }

  if (userId && mode === "auth-pages") {
    const onboardingDone = !!Cookies.get(getOnboardingKey(userId!));

    if (!onboardingDone) {
      return <Navigate to={ROUTES.welcome} />;
    }

    return <Navigate to={ROUTES.dashboard} />;
  }

  return <Outlet />;
};

export default AuthLayout;
