import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { DateValue, TimeInputValue } from "@nextui-org/react";

dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(utc);

export const getSecondsRemaining = (targetDate: Dayjs) => {
  const targetDateUtc = dayjs.tz(targetDate, "UTC");
  const nowUtc = dayjs.tz(dayjs(), "UTC");

  return targetDateUtc.diff(nowUtc, "seconds");
};

export const nextUIDate = (date: Date) => {
  const isoDateString = date.toISOString().split("T")[0];

  return parseDate(isoDateString) as unknown as DateValue;
};

export const nextUITime = (date: Date) => {
  const isoDateString = date.toISOString();

  return parseAbsoluteToLocal(isoDateString) as unknown as TimeInputValue;
};

export const nextUITimeToDate = (time: string) => {
  const isoTime = time.split("[")[0];

  return new Date(isoTime);
};

export const parseDateTime = (date: Date, time: Date) => {
  const parsedDate = date.toDateString();
  const parsedTime = dayjs(time).format("HH:MM");

  return { date: parsedDate, time: parsedTime };
};

export const formatTimestamp = (timestamp: string) => {
  return dayjs(timestamp).format("MMM DD YYYY, HH:MM");
};

export const canStartExam = (timestamp: string) => {
  return dayjs().isAfter(timestamp);
};

type DurationDates = { start: string; end: string };
export const parseDuration = ({ start, end }: DurationDates) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const durationDate = dayjs.duration(startDate.diff(endDate, "seconds"), "seconds");

  const durationHours = durationDate.hours();
  const durationMinutes = durationDate.minutes();
  const durationSeconds = durationDate.seconds();

  const output: string[] = [];

  if (durationHours > 0) {
    output.push(`${durationHours}h`);
  }

  if (durationMinutes > 0) {
    output.push(`${durationMinutes}min`);
  }

  if (durationSeconds > 0) {
    output.push(`${durationSeconds}s`);
  }

  return output.join(" ");
};
