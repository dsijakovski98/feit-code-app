import {
  InferInput,
  enum as enum_,
  maxValue,
  minValue,
  nonEmpty,
  number,
  object,
  pipe,
  string,
  trim,
} from "valibot";

import { MAJOR_TYPE } from "@/constants/students";

export const StudentOnboardingSchema = object({
  fullName: pipe(string(), trim(), nonEmpty("Field is required")),
  bio: pipe(string(), trim()),
  indexNumber: pipe(number(), minValue(1)),
  indexYear: pipe(number(), minValue(1990), maxValue(new Date().getFullYear())),
  major: pipe(enum_(MAJOR_TYPE), nonEmpty()),
});

export type StudentOnboardingSchema = InferInput<typeof StudentOnboardingSchema>;
