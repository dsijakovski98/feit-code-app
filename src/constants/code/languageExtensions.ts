import { langs } from "@uiw/codemirror-extensions-langs";
import { Extension } from "@uiw/react-codemirror";

import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "@/constants/enums";

export const languageExtensions: Record<ProgrammingLanguage, Extension> = {
  [PROGRAMMING_LANGUAGE.javascript]: langs.javascript(),

  [PROGRAMMING_LANGUAGE.typescript]: langs.typescript(),

  [PROGRAMMING_LANGUAGE.c]: langs.c(),

  [PROGRAMMING_LANGUAGE.cpp]: langs.cpp(),

  [PROGRAMMING_LANGUAGE.python]: langs.python(),

  [PROGRAMMING_LANGUAGE.go]: langs.go(),

  [PROGRAMMING_LANGUAGE.rust]: langs.rust(),

  [PROGRAMMING_LANGUAGE.php]: langs.php(),

  [PROGRAMMING_LANGUAGE.bash]: langs.shell(),
};
