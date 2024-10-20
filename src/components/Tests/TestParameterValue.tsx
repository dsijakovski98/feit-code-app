import { InputType } from "@/context/ExamFormContext";

type Props = Pick<InputType, "type" | "value">;

const TestParameterValue = ({ type, value }: Props) => {
  if (type === "string") {
    return <span className="break-words font-medium text-foreground-300">"{value}"</span>;
  }

  if (type === "number") {
    return <span className="font-sans font-medium text-primary-600">{value}</span>;
  }

  if (type === "boolean") {
    return <span className="font-medium">{value.toUpperCase()}</span>;
  }

  if (type === "empty") {
    return <span className="font-medium text-foreground-300">None</span>;
  }

  throw new Error(`Unsupported value type ${type}`);
};

export default TestParameterValue;
