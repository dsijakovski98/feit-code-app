import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "@/constants/enums";

export const languageComments: Record<ProgrammingLanguage, string> = {
  [PROGRAMMING_LANGUAGE.javascript]: "//",

  [PROGRAMMING_LANGUAGE.typescript]: "//",

  [PROGRAMMING_LANGUAGE.c]: "//",

  [PROGRAMMING_LANGUAGE.cpp]: "//",

  [PROGRAMMING_LANGUAGE.python]: "#",

  [PROGRAMMING_LANGUAGE.go]: "//",

  [PROGRAMMING_LANGUAGE.rust]: "//",

  [PROGRAMMING_LANGUAGE.php]: "//",

  [PROGRAMMING_LANGUAGE.bash]: "#",
};
