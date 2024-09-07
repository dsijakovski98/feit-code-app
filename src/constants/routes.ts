import { RecordValues } from "@/types";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  welcome: "/welcome",

  signIn: "/sign-in",
  signUp: "/sign-up",

  ssoCallback: "/sso",
} as const;

export const PAGE_TITLES: Partial<Record<RecordValues<typeof ROUTES>, string>> = {
  "/dashboard": "Dashboard",

  "/sign-in": "Sign in",
  "/sign-up": "Sign up",
};

const websiteBaseUrl = import.meta.env.VITE_WEBSITE_URL;

export const HREF = {
  feitCode: {
    website: websiteBaseUrl,
    contactUs: `${websiteBaseUrl}/contact`,
  },
};
