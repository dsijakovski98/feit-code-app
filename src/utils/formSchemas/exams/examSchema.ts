import {
  InferInput,
  date,
  enum as enum_,
  minValue,
  nonEmpty,
  object,
  pipe,
  regex,
  string,
  trim,
} from "valibot";

import { PROGRAMMING_LANGUAGE } from "@/constants/enums";

export const ExamSchema = object({
  name: pipe(string(), trim(), nonEmpty("Field is required!")),
  language: pipe(enum_(PROGRAMMING_LANGUAGE), nonEmpty("Field is required!")),
  points: pipe(
    string(),
    trim(),
    nonEmpty("Field is required!"),
    regex(/^\d+$/, "Total points must be a positive number!"),
  ),
  startDate: date(),
  startTime: date(),
  durationMinutes: pipe(
    string(),
    trim(),
    nonEmpty("Field is required"),
    regex(/^\d+$/, "Duration must be a positive number!"),
  ),
});

export type ExamSchema = InferInput<typeof ExamSchema>;
