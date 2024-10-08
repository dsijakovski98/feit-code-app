import { InferInput, nonEmpty, object, pipe, regex, string, trim } from "valibot";

export const TaskSchema = object({
  title: pipe(
    string(),
    trim(),
    nonEmpty("Field is required!"),
    regex(/^[A-Za-z_ ]+$/, "Alphabetical characters, underscore (_) and space allowed!"),
  ),
  description: pipe(string(), trim(), nonEmpty("Field is required!")),
  points: pipe(string(), trim(), nonEmpty(), regex(/^\d+$/, "Points must be a positive number!")),
});

export type TaskSchema = InferInput<typeof TaskSchema>;
