import { VALUE_TYPE } from "@/constants/enums";
import { InputType } from "@/context/ExamFormContext";

type Props = Pick<InputType, "type" | "value">;

const TestParameterValue = ({ type, value }: Props) => {
  if (type === VALUE_TYPE.string) {
    return <span className="break-words font-sans font-medium text-foreground-300">"{value}"</span>;
  }

  if (type === VALUE_TYPE.number) {
    return <span className="font-sans font-medium text-primary-600">{value}</span>;
  }

  if (type === VALUE_TYPE.boolean) {
    return <span className="font-mono font-medium">{value.toUpperCase()}</span>;
  }

  if (type === VALUE_TYPE.empty) {
    return <span className="font-sans font-medium text-foreground-300">None</span>;
  }

  throw new Error(`Unsupported value type ${type}`);
};

export default TestParameterValue;
