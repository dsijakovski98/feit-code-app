import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const jsConfig: LanguageConfig = {
  comment: "//",
  emptyValue: "null",
  funcPrefix: "function",
  fileType: "js",
  extension: langs.javascript(),
  commandExec: (taskName) => `node ${taskName}.js`,

  supportsTests: true,

  parseIO: (test) => {
    const inputs = test.inputs.map((input) => input.name);

    // JS needs inputs only, output is not explicitly defined
    return { inputs, output: "" };
  },

  testCallExpression: (funcCall) => `console.log(${funcCall})`,
};
