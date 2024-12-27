import { langs } from "@uiw/codemirror-extensions-langs";

import { PROGRAMMING_LANGUAGE } from "@/constants/enums";
import { PLACEHOLDER_COMMENT } from "@/constants/grades";
import { LanguageConfig } from "@/types";
import { testFuncArguments } from "@/utils/code";

export const jsConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "function",
  emptyValue: "null",
  extension: langs.javascript(),
  commandExec: (taskName) => `node ${taskName}.js`,

  supportsTests: true,

  parseIO: (test) => {
    const inputs = test.inputs.map((input) => input.name);

    // JS needs inputs only, output is not explicitly defined
    return { inputs, output: "" };
  },

  addTestCommand: ({ code, funcName, testInputs }) => {
    const args = testFuncArguments(testInputs, PROGRAMMING_LANGUAGE.javascript);

    const funcCall = `${funcName}(${args})`;
    const callCommand = `console.log(${funcCall})`;

    return code.replace(`// ${PLACEHOLDER_COMMENT}`, callCommand);
  },
};
