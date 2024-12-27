import { langs } from "@uiw/codemirror-extensions-langs";

import { InputValueType, PROGRAMMING_LANGUAGE, VALUE_TYPE } from "@/constants/enums";
import { PLACEHOLDER_COMMENT } from "@/constants/grades";
import { LanguageConfig } from "@/types";
import { testFuncArguments } from "@/utils/code";

const typeMap: Record<InputValueType, string> = {
  [VALUE_TYPE.string]: "string",
  [VALUE_TYPE.number]: "number",
  [VALUE_TYPE.boolean]: "boolean",
  [VALUE_TYPE.empty]: "null | undefined",
};

export const tsConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "function",
  emptyValue: "null",
  extension: langs.typescript(),
  commandExec: (taskName) => `bun run ${taskName}.ts`,

  supportsTests: true,

  parseIO: (test) => {
    const inputs = test.inputs.map((input) => `${input.name}: ${typeMap[input.type]}`);
    // Trailing colon needed for proper formatting ex. function (a: int, b: int): int {}
    const output = `: ${typeMap[test.type]}`;

    return { inputs, output };
  },

  addTestCommand: ({ code, funcName, testInputs }) => {
    const args = testFuncArguments(testInputs, PROGRAMMING_LANGUAGE.typescript);

    const funcCall = `${funcName}(${args})`;
    const callCommand = `console.log(${funcCall})`;

    return code.replace(`// ${PLACEHOLDER_COMMENT}`, callCommand);
  },
};
