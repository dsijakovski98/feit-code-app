import { InferInput, email, nonEmpty, object, pipe, string, trim } from "valibot";

export const SignInSchema = object({
  email: pipe(string(), trim(), nonEmpty("Email cannot be empty!"), email("Please enter a valid email!")),
  password: pipe(string(), trim(), nonEmpty("Email cannot be empty!")),
});

export type SignInSchema = InferInput<typeof SignInSchema>;
