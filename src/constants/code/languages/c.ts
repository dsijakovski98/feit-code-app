import { langs } from "@uiw/codemirror-extensions-langs";

import { LanguageConfig } from "@/types";

export const cConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: ".", // Can be any return type void | int | char etc
  extension: langs.c(),
};
