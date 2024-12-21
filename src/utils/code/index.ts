import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage } from "@/constants/enums";
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
