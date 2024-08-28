import { pgEnum } from "drizzle-orm/pg-core";

export const teacherType = pgEnum("teacher_type", ["professor", "assistant"]);

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
