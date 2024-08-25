import { RecordValues } from "@/types";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",

  signIn: "/sign-in",
  signUp: "/sign-up",

  ssoCallback: "/sso",
} as const;

export const PAGE_TITLES: Partial<Record<RecordValues<typeof ROUTES>, string>> = {
  "/dashboard": "Dashboard",

  "/sign-in": "Sign in",
  "/sign-up": "Sign up",
};
