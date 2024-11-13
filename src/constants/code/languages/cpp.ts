import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const cppConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: ".", // Can be any return type void | int | char etc
  extension: langs.cpp(),
  commandExec: (taskName) => `g++ ${taskName}.cpp -o ${taskName} && ./${taskName}`,
};
