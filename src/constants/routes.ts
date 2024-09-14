import { RecordValues } from "@/types";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  welcome: "/welcome",

  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  ssoCallback: "/sso",

  profile: "/profile",
  courses: "/dashboard/courses",
  exams: "/dashboard/exams",
} as const;

export const PAGE_TITLES: Partial<Record<RecordValues<typeof ROUTES>, string>> = {
  "/dashboard": "Dashboard",
  "/welcome": "Onboarding",

  "/sign-in": "Sign in",
  "/sign-up": "Sign up",
  "/forgot-password": "Forgot password",

  "/profile": "Profile",
  "/dashboard/courses": "Courses",
  "/dashboard/exams": "Exams",
};

const websiteBaseUrl = import.meta.env.VITE_WEBSITE_URL;

export const HREF = {
  feitCode: {
    website: websiteBaseUrl,
    contactUs: `${websiteBaseUrl}/contact`,
  },
};
