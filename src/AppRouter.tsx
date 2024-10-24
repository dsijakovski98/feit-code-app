import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import CourseDetailsLayout from "@/layouts/DetailsLayout/CourseDetailsLayout";
import ExamDetailsLayout from "@/layouts/DetailsLayout/ExamDetailsLayout";
import MainLayout from "@/layouts/MainLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PageFallback from "@/layouts/PageFallback";
import UserTypeOnlyLayout from "@/layouts/UserTypeOnly";

import PageWrapper from "@/components/PageWrapper";

import { ROUTES } from "@/constants/routes";
import { USER_TYPE } from "@/types";

const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));
const CallbackSSO = lazy(() => import("@/pages/auth/sso-callback"));
const WelcomePage = lazy(() => import("@/pages/welcome"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const ProfilePage = lazy(() => import("@/pages/dashboard/profile"));
const ExamsPage = lazy(() => import("@/pages/dashboard/exams"));
const CoursesPage = lazy(() => import("@/pages/dashboard/courses"));
const CourseDetailsPage = lazy(() => import("@/pages/dashboard/courses/details"));
const NewCoursePage = lazy(() => import("@/pages/dashboard/courses/new-course"));
const NewExamPage = lazy(() => import("@/pages/dashboard/courses/new-exam"));
const ExamDetailsPage = lazy(() => import("@/pages/dashboard/exams/details"));

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
                  element={<Navigate to={`${ROUTES.dashboard}${ROUTES.courses}`} replace />}
                />

                <Route
                  path={ROUTES.exams}
                  element={<Navigate to={`${ROUTES.dashboard}${ROUTES.exams}`} replace />}
                />

                <Route path={ROUTES.dashboard}>
                  <Route index element={<Dashboard />} />

                  <Route path="courses">
                    <Route index element={<CoursesPage />} />

                    <Route element={<UserTypeOnlyLayout type={USER_TYPE.professor} />}>
                      <Route path="new" element={<NewCoursePage />} />
                    </Route>

                    <Route path=":id" element={<CourseDetailsLayout />}>
                      <Route index element={<CourseDetailsPage />} />

                      <Route element={<UserTypeOnlyLayout type={USER_TYPE.professor} />}>
                        <Route path="new-exam" element={<NewExamPage />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route path="exams">
                    <Route index element={<ExamsPage />} />
                    <Route path=":id" element={<ExamDetailsLayout />}>
                      <Route index element={<ExamDetailsPage />} />
                    </Route>
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
              <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
              <Route path={ROUTES.ssoCallback} element={<CallbackSSO />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
