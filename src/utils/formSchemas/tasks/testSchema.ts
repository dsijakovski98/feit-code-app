import { InferInput, enum_, nonEmpty, object, pipe, string, toLowerCase } from "valibot";

import { VALUE_TYPE } from "@/constants/enums";
import { BOOLEANS } from "@/constants/tests";
import { isNumber } from "@/utils";

export const TypeValueSchema = object({
  type: pipe(enum_(VALUE_TYPE), nonEmpty("Field is required")),
  value: string("Not a string"),
});
export type TypeValueSchema = InferInput<typeof TypeValueSchema>;

export const TaskTestSchema = object({
  ...TypeValueSchema.entries,
});
export type TaskTestSchema = InferInput<typeof TaskTestSchema>;

export const TestInputSchema = object({
  name: pipe(string(), nonEmpty("Field is required"), toLowerCase()),
  ...TypeValueSchema.entries,
});

export type TestInputSchema = InferInput<typeof TestInputSchema>;

type ValidationResult =
  | {
      valid: false;
      message: string;
    }
  | {
      valid: true;
    };
export const isValueValid = ({ type, value }: TypeValueSchema): ValidationResult => {
  if (type === VALUE_TYPE.number) {
    const valid = isNumber(Number(value));

    if (!valid) {
      return { valid: false, message: "Value must be a number!" };
    }

    return { valid: true };
  }

  if (type === VALUE_TYPE.boolean) {
    const valid = Object.values(BOOLEANS).includes(value as (typeof BOOLEANS)[keyof typeof BOOLEANS]);

    if (!valid) {
      return { valid: false, message: `Value must be either "${BOOLEANS.true}" or "${BOOLEANS.false}"` };
    }

    return { valid: true };
  }

  return { valid: true };
};
