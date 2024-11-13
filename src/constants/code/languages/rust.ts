import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const rustConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "fn",
  extension: langs.rust(),
  commandExec: (taskName) => `rustc ${taskName}.rs && ./${taskName}`,
};
