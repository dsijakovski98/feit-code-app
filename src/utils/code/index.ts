import { InferSelectModel } from "drizzle-orm";

import { inputs } from "@/db/schema";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { InputValueType, ProgrammingLanguage } from "@/constants/enums";
import { FCStudent } from "@/hooks/useFCUser";

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

export const parseParameterValue = (value: string, type: InputValueType, emptyValue: string = "0") => {
  switch (type) {
    case "empty":
      return emptyValue ?? "0";
    case "number":
      return value;
    case "boolean":
      return value;
    case "string":
      return `"${value}"`;
    default:
      throw new Error(`Invalid type ${type} for parsing`);
  }
};

export const testFuncArguments = (
  testInputs: InferSelectModel<typeof inputs>[],
  language: ProgrammingLanguage,
) => {
  const emptyValue = LANGUAGES_CONFIG[language].emptyValue;

  const args = testInputs.map((input) => {
    return parseParameterValue(input.value, input.valueType, emptyValue);
  });

  return args.join(", ");
};

type TemplateOptions = {
  courseId: string;
  examId: string;
  taskTitle: string;
};
export const taskTemplateRef = ({ courseId, examId, taskTitle }: TemplateOptions) => {
  return `course_${courseId}/exam_${examId}/${taskTitle}`;
};

export const studentTaskRef = ({
  id,
  firstName,
  lastName,
}: Pick<FCStudent, "id" | "firstName" | "lastName">) => {
  return `student_${id}_${firstName}_${lastName}`;
};
