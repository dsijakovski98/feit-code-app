import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import "virtual:svg-icons-register";

import { ClerkProvider } from "@clerk/clerk-react";
import { NextUIProvider } from "@nextui-org/react";

import AuthLayout from "@/layouts/AuthLayout";

import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import CallbackSSO from "@/pages/auth/sso-callback";
import Dashboard from "@/pages/dashboard";
import WelcomePage from "@/pages/welcome";

import PageWrapper from "@/components/PageWrapper";

import "@/styles/global.css";

import { ROUTES } from "@/constants/routes";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Missing Clerk publishable key!");
}

const router = createBrowserRouter([
  {
    element: <PageWrapper />,
    children: [
      {
        element: <AuthLayout mode="protect" />,
        children: [
          {
            path: ROUTES.home,
            element: <Navigate to="/dashboard" />,
          },
          {
            path: ROUTES.dashboard,
            element: <Dashboard />,
          },
          {
            path: ROUTES.welcome,
            element: <WelcomePage />,
          },
        ],
      },
      {
        element: <AuthLayout mode="auth-pages" />,
        children: [
          {
            path: ROUTES.signIn,
            element: <SignInPage />,
          },
          {
            path: ROUTES.signUp,
            element: <SignUpPage />,
          },
          {
            path: ROUTES.ssoCallback,
            element: <CallbackSSO />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
      </ClerkProvider>
    </NextUIProvider>
  </StrictMode>,
);
