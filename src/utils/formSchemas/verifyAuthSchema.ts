import { InferInput, nonEmpty, object, pipe, regex, string, trim } from "valibot";

export const VerifyAuthSchema = object({
  code: pipe(
    string(),
    trim(),
    nonEmpty("Code cannot be empty!"),
    regex(/^\d{6}$/, "Code must consist of 6 digits!"),
  ),
});

export type VerifyAuthSchema = InferInput<typeof VerifyAuthSchema>;
