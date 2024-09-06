import { InferInput, enum as enum_, nonEmpty, object, pipe, regex, string, trim } from "valibot";

import { MAJOR_TYPE } from "@/constants/students";

export const StudentOnboardingBasicInfoSchema = object({
  fullName: pipe(string(), trim(), nonEmpty("Field is required")),
  bio: pipe(string(), trim()),
});

export type StudentOnboardingBasicInfoSchema = InferInput<typeof StudentOnboardingBasicInfoSchema>;

export const StudentOnboardingMajorSchema = object({
  indexNumber: pipe(
    string(),
    trim(),
    nonEmpty("Field is required!"),
    regex(/^\d+$/, "Number must be a positive integer!"),
  ),
  indexYear: pipe(
    string(),
    trim(),
    nonEmpty("Field is required!"),
    regex(/^\d+$/, "Year must be a positive integer!"),
  ),
  major: pipe(enum_(MAJOR_TYPE), nonEmpty("Field is required!")),
});

export type StudentOnboardingMajorSchema = InferInput<typeof StudentOnboardingMajorSchema>;
