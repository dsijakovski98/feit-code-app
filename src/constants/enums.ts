import { RecordValues } from "@/types";

export const PROGRAMMING_LANGUAGE = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  c: "C",
  cpp: "C++",
  bash: "Bash",
  go: "Go",
  python: "Python",
  rust: "Rust",
  php: "PHP",
};
export type ProgrammingLanguage = RecordValues<typeof PROGRAMMING_LANGUAGE>;

export const EXAM_STATUS = {
  new: "New",
  ongoing: "Ongoing",
  completed: "Completed",
};
export type ExamStatus = RecordValues<typeof EXAM_STATUS>;

export const TASK_STATUS = {
  submitted: "Submitted",
  inProgress: "In Progress",
  graded: "Graded",
};
export type TaskStatus = RecordValues<typeof TASK_STATUS>;
