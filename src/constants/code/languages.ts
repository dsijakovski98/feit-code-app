import { langs } from "@uiw/codemirror-extensions-langs";
import { Extension } from "@uiw/react-codemirror";

import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "@/constants/enums";

export type LanguageConfig = {
  comment: string;
  extension: Extension;
  testsSupport?: boolean;
};

export const LANGUAGES_CONFIG: Record<ProgrammingLanguage, LanguageConfig> = {
  [PROGRAMMING_LANGUAGE.javascript]: {
    comment: "//",
    extension: langs.javascript(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.typescript]: {
    comment: "//",
    extension: langs.typescript(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.c]: {
    comment: "//",
    extension: langs.c(),
  },

  [PROGRAMMING_LANGUAGE.cpp]: {
    comment: "//",
    extension: langs.cpp(),
  },

  [PROGRAMMING_LANGUAGE.python]: {
    comment: "#",
    extension: langs.python(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.go]: {
    comment: "//",
    extension: langs.go(),
    testsSupport: true,
  },

  [PROGRAMMING_LANGUAGE.rust]: {
    comment: "//",
    extension: langs.rust(),
  },

  [PROGRAMMING_LANGUAGE.php]: {
    comment: "//",
    extension: langs.php(),
  },

  [PROGRAMMING_LANGUAGE.bash]: {
    comment: "#",
    extension: langs.shell(),
  },
};
