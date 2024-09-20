import { InferInput, nonEmpty, object, pipe, string, trim } from "valibot";

export const CourseSchema = object({
  name: pipe(string(), trim(), nonEmpty("Field is required!")),
  description: pipe(string(), trim()),
  categories: pipe(string(), trim()),
  assistantId: pipe(string(), trim()),
});

export type CourseSchema = InferInput<typeof CourseSchema>;
