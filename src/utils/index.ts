import { UserResource } from "@clerk/types";

import { EXAM_STATUS, ExamStatus } from "@/constants/enums";
import { HREF } from "@/constants/routes";
import { UseFCUser } from "@/hooks/useFCUser";

export const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase();

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
// https://www.builder.io/blog/relative-time
export function getRelativeTimeString(date: Date | number, lang = navigator.language): string {
  if (date instanceof Date) {
    // Convert to CEST timezone
    date.setHours(date.getHours() + 2);
  }
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array representing one minute, hour, day, week, month, etc in seconds
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));

  if (unitIndex === 0) return "just now";

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

// https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
export const getContrastText = function (hexColor: string) {
  // If a leading # is provided, remove it
  if (hexColor.slice(0, 1) === "#") {
    hexColor = hexColor.slice(1);
  }

  // Convert to RGB value
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "#000" : "#fff";
};

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

export const getDaytime = (date: Date | number) => {
  const [day, ...dateTime] = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .split(" ");

  return `${day} ${dateTime.join(" ").replace(",", "")}`;
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

  return `${name}'s late night coding`;
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

export const getSemesterType = () => {
  const currentMonth = new Date().getMonth() + 1;

  return currentMonth <= 9 ? "Summer" : "Winter";
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

export const parseExamStatus = (status: ExamStatus): string => {
  switch (status) {
    case EXAM_STATUS.new:
      return "Upcoming exam";

    default:
      return status;
  }
};
