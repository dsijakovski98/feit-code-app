import { capitalize } from "..";

import { ProgrammingLanguage } from "@/constants/enums";
import { taskTemplate } from "@/constants/taskTemplates";

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

  const templateMaker = taskTemplate[language];

  if (!templateMaker) return `Template for ${language} is not yet supported.`;

  const functionName = functionNameFromTitle(title);

  return templateMaker(functionName, description || "No description available.").trim();
};
