import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const phpConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "function",
  fileType: "php",
  extension: langs.php(),
  commandExec: (taskName) => `php ${taskName}.php`,
};
