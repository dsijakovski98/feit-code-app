import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage } from "@/constants/enums";

export const supportsTests = (language: ProgrammingLanguage) => {
  return !!LANGUAGES_CONFIG[language].supportsTests;
};

const funcNameRegex = (language: ProgrammingLanguage) => {
  const prefix = LANGUAGES_CONFIG[language].funcPrefix;
  return new RegExp(`${prefix}\\s+(\\w+)\\s*\\(`);
};

export const extractFunctionName = (template: string, language: ProgrammingLanguage) => {
  const funcRegex = funcNameRegex(language);

  return funcRegex.exec(template)?.at(1) ?? "";
};
