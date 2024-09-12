import { UserResource } from "@clerk/types";

import { HREF } from "@/constants/routes";
import { UseFCUser } from "@/hooks/useFCUser";

export const splitFullName = (fullName: string) => {
  const [firstName, ...lastName] = fullName.split(" ");

  return { firstName, lastName: lastName.join(" ") };
};

export const shortClerkErrorMessage = (
  e: { errors: Array<{ message: string; longMessage?: string }> },
  config?: { useLongMessage?: boolean },
) => {
  const message = config?.useLongMessage
    ? e.errors[0].longMessage || e.errors[0].message
    : e.errors[0].message;

  // Return only the first sentence
  return message.split(".")[0].trim() + "!";
};

export const getDaytime = () => {
  const [day, ...date] = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(Date.now())
    .split(" ");

  return `${day}, ${date.join(" ")}`;
};

export const getTimeGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 21) {
    return "Good evening";
  } else if (currentHour >= 21 && currentHour < 24) {
    return "Almost bedtime";
  }

  return "Late night coding";
};

export const getHelpFeedbackUrl = (userData: UseFCUser["userData"]) => {
  if (!userData) return "";

  const {
    user: { firstName, lastName, email },
  } = userData;

  const baseUrl = new URL(HREF.feitCode.contactUs);
  baseUrl.searchParams.append("name", `${firstName} ${lastName}`);
  baseUrl.searchParams.append("email", email);
  baseUrl.searchParams.append("type", "report-issue");

  return baseUrl.href;
};

export const getSchoolYear = () => {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // +1 because months are 0-indexed

  let startYear = 0;
  let endYear = 0;

  if (currentMonth <= 9) {
    startYear = currentYear - 1;
    endYear = currentYear;
  } else {
    startYear = currentYear;
    endYear = currentYear + 1;
  }

  return `${startYear}/${endYear.toString().slice(-2)}`;
};

export const getAuthStrategy = (user?: UserResource | null) => {
  if (user?.primaryEmailAddress?.verification.strategy?.includes("google")) {
    return "Google";
  }

  if (user?.primaryEmailAddress?.verification.strategy?.includes("github")) {
    return "GitHub";
  }

  return null;
};
