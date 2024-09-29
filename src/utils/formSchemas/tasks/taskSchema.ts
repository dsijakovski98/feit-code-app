import { InferInput, nonEmpty, object, pipe, regex, string, trim } from "valibot";

export const TaskSchema = object({
  title: pipe(string(), trim(), nonEmpty("Field is required!")),
  description: pipe(string(), trim()),
  points: pipe(string(), trim(), nonEmpty(), regex(/^\d+$/, "Points must be a positive number!")),
});

export type TaskSchema = InferInput<typeof TaskSchema>;
