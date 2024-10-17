import TestParameterValue from "@/components/Tests/TestParameterValue";
import Icon from "@/components/ui/Icon";

import { TestType } from "@/context/ExamFormContext";

type Props = {
  test: TestType;
};

const TestPreview = ({ test }: Props) => {
  const { inputs, type, value } = test;

  return (
    <div className="flex items-center gap-12 rounded-md bg-default-100 p-3">
      <Icon name="test" className="h-6 w-6" />

      <div className="contents text-base">
        <div>
          <p className="font-semibold uppercase">Inputs</p>
          {inputs.length === 0 && <p className="text-foreground-300">None</p>}
          {inputs.length > 0 && (
            <ol className="flex max-w-[300px] flex-wrap items-center gap-2">
              {inputs.map((input) => (
                <li key={input.name}>{input.name}</li>
              ))}
            </ol>
          )}
        </div>

        <div>
          <p className="font-semibold uppercase">Output</p>
          <TestParameterValue type={type} value={value} />
        </div>
      </div>
    </div>
  );
};

export default TestPreview;
