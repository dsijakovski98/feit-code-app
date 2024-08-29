import { pgEnum } from "drizzle-orm/pg-core";

import { TEACHER_TYPE } from "@/constants/professors";
import { MAJOR_TYPE } from "@/constants/students";

export const moduleType = pgEnum("module_type", [
  MAJOR_TYPE.KTI,
  MAJOR_TYPE.KSIAR,
  MAJOR_TYPE.KHIE,
  MAJOR_TYPE.TKII,
]);

export const teacherType = pgEnum("teacher_type", [TEACHER_TYPE.teacher, TEACHER_TYPE.assistant]);

export const programmingLanguage = pgEnum("programming_language", [
  "JavaScript",
  "C",
  "Bash",
  "TypeScript",
  "C++",
  "Go",
  "Python",
  "Rust",
  "PHP",
]);

export const taskStatus = pgEnum("task_status", ["submitted", "in-progress", "graded"]);
