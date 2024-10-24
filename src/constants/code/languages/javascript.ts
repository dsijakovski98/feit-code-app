import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const jsConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "function",
  emptyValue: "null",
  extension: langs.javascript(),
  supportsTests: true,
  parseIO: (test) => {
    const inputs = test.inputs.map((input) => input.name);

    // JS needs inputs only, output is not explicitly defined
    return { inputs, output: "" };
  },
};
