export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  welcome: "/welcome",

  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  ssoCallback: "/sso",

  profile: "/profile",
  courses: "/courses",
  exams: "/exams",
  examSession: "/exam-session",

  gradeExam: "/grade",
} as const;

export const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/welcome": "Onboarding",

  "/sign-in": "Sign in",
  "/sign-up": "Sign up",
  "/forgot-password": "Forgot password",

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
