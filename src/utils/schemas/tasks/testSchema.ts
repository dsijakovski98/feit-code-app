import { InferInput, enum_, nonEmpty, object, pipe, regex, string } from "valibot";

import { VALUE_TYPE } from "@/constants/enums";

export const TypeSchema = object({
  type: pipe(enum_(VALUE_TYPE), nonEmpty("Field is required")),
});
export type TypeSchema = InferInput<typeof TypeSchema>;

export const TypeValueSchema = object({
  value: string("Not a string"),
  ...TypeSchema.entries,
});
export type TypeValueSchema = InferInput<typeof TypeValueSchema>;

export const TaskTestSchema = object({
  ...TypeValueSchema.entries,
});
export type TaskTestSchema = InferInput<typeof TaskTestSchema>;

export const TestInputSchema = object({
  name: pipe(
    string(),
    nonEmpty("Field is required"),
    regex(/^[A-Za-z_]+$/, "Alphabet characters and underscore (_) allowed!"),
  ),
  ...TypeValueSchema.entries,
});

export type TestInputSchema = InferInput<typeof TestInputSchema>;
