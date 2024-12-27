import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const pyConfig: LanguageConfig = {
  comment: "#",
  funcPrefix: "def",
  emptyValue: "None",
  extension: langs.python(),
  commandExec: (taskName) => `python3 ${taskName}.py`,

  supportsTests: true,
  parseIO: (test) => {
    const inputs = test.inputs.map((input) => input.name);

    // Python without types, doesn't need input types NOR output
    return { inputs, output: "" };
  },
};
