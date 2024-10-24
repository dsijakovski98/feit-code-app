import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const bashConfig: LanguageConfig = {
  comment: "#",
  funcPrefix: "function",
  extension: langs.shell(),
};
