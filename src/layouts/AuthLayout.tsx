import { Navigate, Outlet } from "react-router-dom";

import { useAuth, useUser } from "@clerk/clerk-react";

import { ROUTES } from "@/constants/routes";

type Props = {
  mode: "protect" | "auth-pages";
};

const AuthLayout = ({ mode }: Props) => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (mode === "protect") {
    if (!userId) {
      return <Navigate to={ROUTES.signIn} />;
    }

    const onboardingComplete = !!user?.publicMetadata.onboardingComplete;

    if (!onboardingComplete) {
      return <Navigate to={ROUTES.welcome} />;
    }

    return <Outlet />;
  }

  if (mode === "auth-pages") {
    if (userId) {
      return <Navigate to={ROUTES.signIn} />;
    }

    return <Outlet />;
  }

  throw new Error(`Invalid route state ${userId} ${mode}`);
};

export default AuthLayout;
