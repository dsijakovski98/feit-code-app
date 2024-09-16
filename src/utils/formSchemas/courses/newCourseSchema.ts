import { InferInput, nonEmpty, object, pipe, string, trim } from "valibot";

export const NewCourseSchema = object({
  name: pipe(string(), trim(), nonEmpty("Field is required!")),
  description: pipe(string(), trim()),
  categories: pipe(string(), trim()),
  assistantId: pipe(string(), trim()),
});

export type NewCourseSchema = InferInput<typeof NewCourseSchema>;
