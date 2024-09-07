import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import "virtual:svg-icons-register";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ClerkProvider } from "@clerk/clerk-react";
import { NextUIProvider } from "@nextui-org/react";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";

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
            element: <OnboardingLayout mode="onboard" />,
            children: [
              {
                element: <MainLayout />,
                children: [
                  {
                    path: ROUTES.home,
                    element: <Navigate to="/dashboard" />,
                  },
                  {
                    path: ROUTES.dashboard,
                    element: <Dashboard />,
                  },
                  // TODO: Add other main layout routes
                ],
              },
            ],
          },
          {
            element: <OnboardingLayout mode="welcome" />,
            children: [
              {
                path: ROUTES.welcome,
                element: <WelcomePage />,
              },
            ],
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{ position: "bottom-right", className: "bg-background text-foreground" }}
          />
        </ClerkProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </StrictMode>,
);
