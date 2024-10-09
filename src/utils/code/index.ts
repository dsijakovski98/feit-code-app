import { capitalize } from "..";

import { ProgrammingLanguage } from "@/constants/enums";
import { parseTemplate } from "@/utils/code/taskTemplates";

const functionNameFromTitle = (title: string) => {
  return title
    .split(/\s+/)
    .map((w) => capitalize(w))
    .join("");
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
