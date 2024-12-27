import { langs } from "@uiw/codemirror-extensions-langs";

import { InputValueType, VALUE_TYPE } from "@/constants/enums";
import { LanguageConfig } from "@/types";

const typeMap: Record<InputValueType, string> = {
  [VALUE_TYPE.string]: "string",
  [VALUE_TYPE.number]: "int",
  [VALUE_TYPE.boolean]: "bool",
  [VALUE_TYPE.empty]: "nil",
};

export const goConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "func",
  emptyValue: "nil",
  extension: langs.go(),
  commandExec: (taskName) => `go run ${taskName}.go`,

  supportsTests: true,

  parseIO: (test) => {
    const inputs = test.inputs.map((input) => `${input.name} ${typeMap[input.type]}`);
    // Trailing space needed for proper formatting ex. func (a int, b int) int {}
    const output = ` ${typeMap[test.type]}`;

    return { inputs, output };
  },

  testCallExpression: (funcCall) => `fmt.Println(${funcCall})`,
};
