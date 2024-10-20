import { useMemo } from "react";
import toast from "react-hot-toast";

import TestParameterValue from "@/components/Tests/TestParameterValue";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { TestType } from "@/context/ExamFormContext";
import { TaskFormContext } from "@/context/TaskFormContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  test: TestType;
  columnKey: string;
};

const TestParameterCell = ({ test, columnKey }: Props) => {
  const { testsState } = useCtx(TaskFormContext);
  const [, setTests] = testsState;

  const input = useMemo(
    () => test.inputs.find((input) => input.name === columnKey),
    [test.inputs, columnKey],
  );

  const removeTest = () => {
    setTests((prev) => prev.filter((prevTest) => prevTest.id !== test.id));
    toast("Removed test!");
  };

  if (columnKey === "Actions") {
    return (
      <Button isIconOnly variant="light" color="danger" radius="full" onPress={removeTest}>
        <Icon name="trash" className="h-5 w-5" />
      </Button>
    );
  }

  if (columnKey === "Output") {
    return <TestParameterValue type={test.type} value={test.value} />;
  }

  if (!input) return null;

  return <TestParameterValue type={input.type} value={input.value} />;
};

export default TestParameterCell;
