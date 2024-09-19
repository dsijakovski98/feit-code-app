export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  welcome: "/welcome",

  signIn: "/sign-in",
  signUp: "/sign-up",

  ssoCallback: "/sso",

  profile: "/profile",
  courses: "/courses",
  exams: "/exams",
} as const;

export const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/welcome": "Onboarding",

  "/sign-in": "Sign in",
  "/sign-up": "Sign up",

  "/profile": "Profile",
  "/dashboard/courses": "Courses",
  "/dashboard/exams": "Exams",
} as const;

const websiteBaseUrl = import.meta.env.VITE_WEBSITE_URL;

export const HREF = {
  feitCode: {
    website: websiteBaseUrl,
    contactUs: `${websiteBaseUrl}/contact`,
  },
};
