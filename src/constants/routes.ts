import { RecordValues } from "@/types";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",

  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

export const PAGE_TITLES: Record<RecordValues<typeof ROUTES>, string> = {
  "/": "",
  "/dashboard": "Dashboard",

  "/sign-in": "Sign in",
  "/sign-up": "Sign up",
};
