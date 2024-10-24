import { ProgrammingLanguage } from "../../constants/enums";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { TaskType } from "@/context/ExamFormContext";
import { capitalize } from "@/utils";

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

const functionNameFromTitle = (title: string) => {
  const words = title.split(/\s+/);
  const parsedWords = words.map((word) => (words.length > 1 ? capitalize(word) : word));

  return parsedWords.join("");
};

export type TemplateParams = Pick<TaskType, "title" | "description" | "tests"> & {
  language: ProgrammingLanguage;
};
export const parseTaskTemplate = ({ title, description, tests, language }: TemplateParams) => {
  if (title.length === 0) return "Task not defined yet.";
  console.log(tests);

  let template = taskTemplate[language];

  if (!template) return `Template for ${language} is not yet supported.`;

  const functionName = functionNameFromTitle(title);
  template = template.replace("<fname>", functionName);

  const baseDescription = description || "No description available.";
  const descriptionChunks = baseDescription
    .split(".")
    .filter((chunk) => !!chunk.length)
    .map((chunk) => {
      const { comment } = LANGUAGES_CONFIG[language];

      return `${comment} ${chunk.trim()}`;
    });

  template = template.replace("<description>", descriptionChunks.join("\n"));

  if (LANGUAGES_CONFIG[language].supportsTests) {
    // Only need the fist test because we want the types, which are the same for each test
    const sampleTest = tests[0];

    if (!sampleTest) {
      template = template.replace("<inputs>", "");
      template = template.replace("<output>", "");

      return template.trim();
    }

    const { inputs, output } = LANGUAGES_CONFIG[language].parseIO(sampleTest);

    template = template.replace("<inputs>", inputs.length ? inputs.join(", ") : "");
    template = template.replace("<output>", output);
  }

  return template.trim();
};
