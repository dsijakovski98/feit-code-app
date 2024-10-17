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
} as const;
export type ProgrammingLanguage = RecordValues<typeof PROGRAMMING_LANGUAGE>;

export const EXAM_STATUS = {
  new: "New",
  ongoing: "Ongoing",
  completed: "Completed",
} as const;
export type ExamStatus = RecordValues<typeof EXAM_STATUS>;

export const SUBMISSION_STATUS = {
  submitted: "Submitted",
  inProgress: "In Progress",
  graded: "Graded",
} as const;
export type SubmissionStatus = RecordValues<typeof SUBMISSION_STATUS>;

export const VALUE_TYPE = {
  string: "string",
  number: "number",
  boolean: "boolean",
  empty: "empty",
} as const;
export type ValueType = RecordValues<typeof VALUE_TYPE>;

export const PARAMETER_TYPE = {
  input: "input",
  output: "output",
};
export type ParameterType = RecordValues<typeof PARAMETER_TYPE>;
