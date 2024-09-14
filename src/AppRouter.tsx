import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PageFallback from "@/layouts/PageFallback";

import PageWrapper from "@/components/PageWrapper";

import { ROUTES } from "@/constants/routes";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const OnboardingLayout = lazy(() => import("@/layouts/OnboardingLayout"));

const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const CallbackSSO = lazy(() => import("@/pages/auth/sso-callback"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const ProfilePage = lazy(() => import("@/pages/dashboard/profile"));
const WelcomePage = lazy(() => import("@/pages/welcome"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<PageWrapper />}>
            <Route element={<AuthLayout mode="protect" />}>
              <Route element={<OnboardingLayout mode="onboard" />}>
                <Route element={<MainLayout />}>
                  <Route path={ROUTES.home} element={<Navigate to={ROUTES.dashboard} />} />
                  <Route path={ROUTES.dashboard} element={<Dashboard />} />
                  <Route path={ROUTES.profile} element={<ProfilePage />} />
                </Route>
              </Route>

              <Route element={<OnboardingLayout mode="welcome" />}>
                <Route path={ROUTES.welcome} element={<WelcomePage />} />
              </Route>
            </Route>

            <Route element={<AuthLayout mode="auth-pages" />}>
              <Route path={ROUTES.signIn} element={<SignInPage />} />
              <Route path={ROUTES.signUp} element={<SignUpPage />} />
              <Route path={ROUTES.ssoCallback} element={<CallbackSSO />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
