import { capitalize } from "..";

import { parseTemplate } from "@/constants/code/taskTemplates";
import { ProgrammingLanguage } from "@/constants/enums";

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
