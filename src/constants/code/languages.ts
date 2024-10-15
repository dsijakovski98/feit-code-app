import { langs } from "@uiw/codemirror-extensions-langs";
import { Extension } from "@uiw/react-codemirror";

import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "@/constants/enums";

export type LanguageConfig = {
  comment: string;
  funcPrefix: string;
  extension: Extension;
  testsSupport?: boolean;
};

export const LANGUAGES_CONFIG: Record<ProgrammingLanguage, LanguageConfig> = {
  [PROGRAMMING_LANGUAGE.javascript]: {
    comment: "//",
    funcPrefix: "function",
    extension: langs.javascript(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.typescript]: {
    comment: "//",
    funcPrefix: "function",
    extension: langs.typescript(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.c]: {
    comment: "//",
    funcPrefix: ".", // Can be any return type void | int | char etc
    extension: langs.c(),
  },

  [PROGRAMMING_LANGUAGE.cpp]: {
    comment: "//",
    funcPrefix: ".", // Can be any return type void | int | char etc
    extension: langs.cpp(),
  },

  [PROGRAMMING_LANGUAGE.python]: {
    comment: "#",
    funcPrefix: "def",
    extension: langs.python(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.go]: {
    comment: "//",
    funcPrefix: "func",
    extension: langs.go(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.rust]: {
    comment: "//",
    funcPrefix: "fn",
    extension: langs.rust(),
  },

  [PROGRAMMING_LANGUAGE.php]: {
    comment: "//",
    funcPrefix: "function",
    extension: langs.php(),
  },

  [PROGRAMMING_LANGUAGE.bash]: {
    comment: "#",
    funcPrefix: "function",
    extension: langs.shell(),
  },
};
