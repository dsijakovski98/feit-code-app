import { InferInput, email, minLength, nonEmpty, object, pipe, string, trim } from "valibot";

export const SignUpSchema = object({
  email: pipe(
    string(),
    trim(),
    nonEmpty("Email cannot be empty!"),
    email("Please enter a valid email!"),
  ),
  password: pipe(
    string(),
    trim(),
    nonEmpty("Password cannot be empty!"),
    minLength(8, "Your password must contain at least 8 characters."),
  ),
  confirmPassword: pipe(string(), trim(), nonEmpty("Field cannot be empty!")),
});

export type SignUpSchema = InferInput<typeof SignUpSchema>;
