import { InferInput, email, minLength, nonEmpty, object, pipe, string, trim } from "valibot";

export const ForgotPasswordSchema = object({
  email: pipe(
    string(),
    trim(),
    nonEmpty("Email cannot be empty!"),
    email("Please enter a valid email!"),
  ),
});

export type ForgotPasswordSchema = InferInput<typeof ForgotPasswordSchema>;

export const VerifyPasswordSchema = object({
  password: pipe(
    string(),
    trim(),
    nonEmpty("Email cannot be empty!"),
    minLength(8, "Your password must contain at least 8 characters."),
  ),
  code: pipe(string(), trim(), nonEmpty("Code cannot be empty!")),
});

export type VerifyPasswordSchema = InferInput<typeof VerifyPasswordSchema>;
