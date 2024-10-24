import { VALUE_TYPE } from "@/constants/enums";
import { BOOLEANS } from "@/constants/tests";
import { isNumber } from "@/utils";
import { TypeValueSchema } from "@/utils/schemas/tasks/testSchema";

export type ValidationResult =
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
