import { ProgrammingLanguage } from "../../constants/enums";

import { languageComments } from "@/constants/code/languageComments";

const templates = import.meta.glob("./templates/*.txt", {
  eager: true,
  query: "?raw",
  import: "default",
});

const taskTemplate: Partial<Record<ProgrammingLanguage, string>> = {};

for (const template in templates) {
  const filename = template.split("/").pop()!;
  const language = filename.split(".")[0] as ProgrammingLanguage;

  taskTemplate[language] = templates[template] as string;
}

type TemplateParams = {
  functionName: string;
  description: string;
  language: ProgrammingLanguage;
};
export const parseTemplate = (params: TemplateParams) => {
  const { functionName, description, language } = params;
  let template = taskTemplate[language];

  if (!template) return `Template for ${language} is not yet supported.`;

  template = template.replace("<fname>", functionName);

  const baseDescription = description || "No description available.";
  const descriptionChunks = baseDescription
    .split(".")
    .filter((chunk) => !!chunk.length)
    .map((chunk) => {
      const comment = languageComments[language];

      return `${comment} ${chunk.trim()}`;
    });

  template = template.replace("<description>", descriptionChunks.join("\n"));

  return template.trim();
};
