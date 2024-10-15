import { capitalize } from "..";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage } from "@/constants/enums";
import { parseTemplate } from "@/utils/code/taskTemplates";

const functionNameFromTitle = (title: string) => {
  const words = title.split(/\s+/);
  const parsedWords = words.map((word) => (words.length > 1 ? capitalize(word) : word));

  return parsedWords.join("");
};

type Template = {
  title: string;
  description: string;
  language: ProgrammingLanguage;
};
export const baseTaskTemplate = ({ title, description, language }: Template) => {
  if (title.length === 0) return "Task not defined yet.";

  const functionName = functionNameFromTitle(title);

  return parseTemplate({ functionName, description, language });
};

export const supportsTests = (language: ProgrammingLanguage) => {
  return !!LANGUAGES_CONFIG[language].testsSupport;
};

const funcNameRegex = (language: ProgrammingLanguage) => {
  const prefix = LANGUAGES_CONFIG[language].funcPrefix;
  return new RegExp(`${prefix}\\s+(\\w+)\\s*\\(`);
};

export const extractFunctionName = (template: string, language: ProgrammingLanguage) => {
  const funcRegex = funcNameRegex(language);

  return funcRegex.exec(template)?.at(1) ?? "";
};
