import { InferInput, boolean, minLength, nonEmpty, object, pipe, string, trim } from "valibot";

export const ResetPasswordSchema = object({
  currentPassword: pipe(string(), trim(), nonEmpty("Password cannot be empty!")),
  newPassword: pipe(string(), trim(), nonEmpty("Password cannot be empty!"), minLength(8)),
  confirmNewPassword: pipe(string(), trim()),
  signOutOfOtherSessions: boolean(),
});

export type ResetPasswordSchema = InferInput<typeof ResetPasswordSchema>;
