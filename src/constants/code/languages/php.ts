import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const phpConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "function",
  extension: langs.php(),
};
