import { bashConfig } from "@/constants/code/languages/bash";
import { cConfig } from "@/constants/code/languages/c";
import { cppConfig } from "@/constants/code/languages/cpp";
import { goConfig } from "@/constants/code/languages/golang";
import { jsConfig } from "@/constants/code/languages/javascript";
import { phpConfig } from "@/constants/code/languages/php";
import { pyConfig } from "@/constants/code/languages/python";
import { rustConfig } from "@/constants/code/languages/rust";
import { tsConfig } from "@/constants/code/languages/typescript";
import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "@/constants/enums";
import { LanguageConfig } from "@/types";

export const LANGUAGES_CONFIG: Record<ProgrammingLanguage, LanguageConfig> = {
  [PROGRAMMING_LANGUAGE.javascript]: jsConfig,

  [PROGRAMMING_LANGUAGE.typescript]: tsConfig,

  [PROGRAMMING_LANGUAGE.c]: cConfig,

  [PROGRAMMING_LANGUAGE.cpp]: cppConfig,

  [PROGRAMMING_LANGUAGE.python]: pyConfig,

  [PROGRAMMING_LANGUAGE.go]: goConfig,

  [PROGRAMMING_LANGUAGE.rust]: rustConfig,

  [PROGRAMMING_LANGUAGE.php]: phpConfig,

  [PROGRAMMING_LANGUAGE.bash]: bashConfig,
};
