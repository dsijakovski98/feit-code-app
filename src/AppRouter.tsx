import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import CourseDetailsLayout from "@/layouts/DetailsLayout/CourseDetailsLayout";
import ExamDetailsLayout from "@/layouts/DetailsLayout/ExamDetailsLayout";
import ExamSessionLayout from "@/layouts/ExamSession/ExamSessionLayout";
import StudentExamLayout from "@/layouts/ExamSession/StudentExamLayout";
import MainLayout from "@/layouts/MainLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PageFallback from "@/layouts/PageFallback";
import UserTypeOnlyLayout from "@/layouts/UserTypeOnly";

import PageWrapper from "@/components/PageWrapper";

import { ROUTES } from "@/constants/routes";
import { USER_TYPE } from "@/types";

const GradeSubmissionPage = lazy(() => import("@/pages/dashboard/exams/grade/grade-submission"));
const GradeExamRedirect = lazy(() => import("@/pages/dashboard/exams/grade/redirect-to-exam"));

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
const ExamSessionPage = lazy(() => import("@/pages/exam-session"));

const UnknownPage = lazy(() => import("@/pages/404"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageWrapper />}>
          <Route element={<AuthLayout mode="protect" />}>
            <Route element={<OnboardingLayout mode="onboard" />}>
              <Route element={<MainLayout />}>
                <Route path={ROUTES.home} element={<Navigate to={ROUTES.dashboard} />} />

                <Route path={ROUTES.dashboard} element={<Dashboard />} />

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

                    <Route path="grade" element={<UserTypeOnlyLayout type={USER_TYPE.professor} />}>
                      <Route index element={<GradeExamRedirect />} />
                      <Route path=":sid" element={<GradeSubmissionPage />} />
                    </Route>
                  </Route>
                </Route>

                <Route path={ROUTES.profile} element={<ProfilePage />} />
              </Route>

              <Route element={<UserTypeOnlyLayout type={USER_TYPE.student} />}>
                <Route
                  element={
                    <Suspense fallback={<PageFallback bg="dots" />}>
                      <Outlet />
                    </Suspense>
                  }
                >
                  <Route element={<ExamSessionLayout />}>
                    <Route element={<StudentExamLayout />}>
                      <Route path={ROUTES.examSession}>
                        <Route index element={<Navigate to={ROUTES.dashboard} />} />

                        <Route path=":id" element={<ExamSessionPage />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
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

          <Route path="*" element={<UnknownPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
