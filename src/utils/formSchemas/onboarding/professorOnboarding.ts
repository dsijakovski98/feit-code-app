import { InferInput, enum as enum_, nonEmpty, object, pipe, string, trim } from "valibot";

import { MAJOR_TYPE } from "@/constants/students";
import { TEACHER_TYPE } from "@/types";

export const ProfessorOnboardingSchema = object({
  fullName: pipe(string(), trim(), nonEmpty("Field is required")),
  type: pipe(enum_(TEACHER_TYPE), nonEmpty()),
  department: pipe(enum_(MAJOR_TYPE), nonEmpty()),
});

export type ProfessorOnboardingSchema = InferInput<typeof ProfessorOnboardingSchema>;
