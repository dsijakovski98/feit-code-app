import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const pyConfig: LanguageConfig = {
  comment: "#",
  funcPrefix: "def",
  emptyValue: "None",
  extension: langs.python(),
  commandExec: (taskName) => `python3 ${taskName}.py`,
};
