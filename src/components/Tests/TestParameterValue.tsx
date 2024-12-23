import clsx, { ClassValue } from "clsx";

import { VALUE_TYPE } from "@/constants/enums";
import { InputType } from "@/context/ExamFormContext";

type Props = {
  className?: ClassValue;
} & Pick<InputType, "type" | "value">;

const TestParameterValue = ({ type, value, className = "" }: Props) => {
  if (type === VALUE_TYPE.string) {
    return (
      <span className={clsx("break-words font-sans font-medium text-foreground-300", className)}>
        "{value}"
      </span>
    );
  }

  if (type === VALUE_TYPE.number) {
    return <span className={clsx("font-sans font-medium text-primary-600", className)}>{value}</span>;
  }

  if (type === VALUE_TYPE.boolean) {
    return <span className={clsx("font-mono font-medium", className)}>{value.toUpperCase()}</span>;
  }

  if (type === VALUE_TYPE.empty) {
    return <span className={clsx("font-sans font-medium text-foreground-300", className)}>None</span>;
  }

  throw new Error(`Unsupported value type ${type}`);
};

export default TestParameterValue;
