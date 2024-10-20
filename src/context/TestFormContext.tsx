import { PropsWithChildren, createContext, useState } from "react";

import { InputValueType, VALUE_TYPE } from "@/constants/enums";
import { Toggle, useToggle } from "@/hooks/useToggle";
import { UseState } from "@/types";
import { TestInputSchema } from "@/utils/schemas/tasks/testSchema";

export type InputMeta = Pick<TestInputSchema, "name" | "type">;

type TestFormContext = {
  inputsMetaState: UseState<InputMeta[]>;
  outputTypeState: UseState<InputValueType>;

  withInputs: Toggle;
};

export const TestFormContext = createContext<TestFormContext | null>(null);
TestFormContext.displayName = "TestFormContext";

const TestFormProvider = ({ children }: PropsWithChildren) => {
  const withInputs = useToggle();

  const inputsMetaState = useState<InputMeta[]>([]);
  const outputTypeState = useState<InputValueType>(VALUE_TYPE.string);

  return (
    <TestFormContext.Provider value={{ withInputs, inputsMetaState, outputTypeState }}>
      {children}
    </TestFormContext.Provider>
  );
};

export default TestFormProvider;
