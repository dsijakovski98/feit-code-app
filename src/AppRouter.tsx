import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PageFallback from "@/layouts/PageFallback";

import PageWrapper from "@/components/PageWrapper";

import { ROUTES } from "@/constants/routes";

const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const CallbackSSO = lazy(() => import("@/pages/auth/sso-callback"));
const WelcomePage = lazy(() => import("@/pages/welcome"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const ProfilePage = lazy(() => import("@/pages/dashboard/profile"));
const CoursesPage = lazy(() => import("@/pages/dashboard/courses"));
const NewCoursePage = lazy(() => import("@/pages/dashboard/courses/new-course"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route element={<AuthLayout mode="protect" />}>
            <Route element={<OnboardingLayout mode="onboard" />}>
              <Route element={<MainLayout />}>
                <Route path={ROUTES.home} element={<Navigate to={ROUTES.dashboard} />} />
                <Route
                  path={ROUTES.courses}
                  element={<Navigate to={`${ROUTES.dashboard}${ROUTES.courses}`} />}
                />

                <Route path={ROUTES.dashboard}>
                  <Route index element={<Dashboard />} />

                  <Route path="courses">
                    <Route index element={<CoursesPage />} />
                    <Route path="new" element={<NewCoursePage />} />
                  </Route>
                </Route>

                <Route path={ROUTES.profile} element={<ProfilePage />} />
              </Route>
            </Route>

            <Route element={<OnboardingLayout mode="welcome" />}>
              <Route path={ROUTES.welcome} element={<WelcomePage />} />
            </Route>
          </Route>

          <Route element={<AuthLayout mode="auth-pages" />}>
            <Route
              element={
                <Suspense fallback={<PageFallback />}>
                  <Outlet />
                </Suspense>
              }
            >
              <Route path={ROUTES.signIn} element={<SignInPage />} />
              <Route path={ROUTES.signUp} element={<SignUpPage />} />
              <Route path={ROUTES.ssoCallback} element={<CallbackSSO />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
