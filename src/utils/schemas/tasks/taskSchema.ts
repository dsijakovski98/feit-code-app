import { InferInput, nonEmpty, object, pipe, regex, string, trim } from "valibot";

export const TaskSchema = object({
  title: pipe(
    string(),
    trim(),
    nonEmpty("Field is required!"),
    regex(/^[A-Za-z_ ]+$/, "Only alphabet characters, underscore (_) and whitespace allowed!"),
  ),
  description: pipe(string(), trim(), nonEmpty("Field is required!")),
  points: pipe(string(), trim(), nonEmpty("Field is required!"), regex(/^\d+$/, "Positive numbers only!")),
});

export type TaskSchema = InferInput<typeof TaskSchema>;
