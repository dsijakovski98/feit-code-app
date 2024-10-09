import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";
import dayjs from "dayjs";

import { DateValue, TimeInputValue } from "@nextui-org/react";

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
