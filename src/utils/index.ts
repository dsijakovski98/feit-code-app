import { UserResource } from "@clerk/types";

import { HREF } from "@/constants/routes";
import { UseFCUser } from "@/hooks/useFCUser";

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
// https://www.builder.io/blog/relative-time
export function getRelativeTimeString(date: Date | number, lang = navigator.language): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array representing one minute, hour, day, week, month, etc in seconds
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

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

export const getTimeGreeting = (name: string) => {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return `Good morning ${name}`;
  } else if (currentHour >= 12 && currentHour < 18) {
    return `Good afternoon ${name}`;
  } else if (currentHour >= 18 && currentHour < 21) {
    return `Good evening ${name}`;
  } else if (currentHour >= 21 && currentHour < 24) {
    return `Almost bedtime ${name}`;
  }

  return `Code never sleeps ${name}`;
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

export const getAcademicYear = () => {
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
