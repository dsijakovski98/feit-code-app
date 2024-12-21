import sh from "@/images/programming-languages/bash.svg";
import c from "@/images/programming-languages/c.svg";
import cpp from "@/images/programming-languages/cpp.svg";
import go from "@/images/programming-languages/go.svg";
import js from "@/images/programming-languages/javascript.svg";
import php from "@/images/programming-languages/php.svg";
import py from "@/images/programming-languages/python.svg";
import rust from "@/images/programming-languages/rust.svg";
import ts from "@/images/programming-languages/typescript.svg";

import { EXAM_STATUS, ExamStatus, PROGRAMMING_LANGUAGE } from "@/constants/enums";
import { Column } from "@/types";
import { parseExamStatus } from "@/utils";

export const PROGRAMMING_LANGUAGES: Array<{ name: string; img: typeof js }> = [
  { name: PROGRAMMING_LANGUAGE.javascript, img: js },
  { name: PROGRAMMING_LANGUAGE.typescript, img: ts },
  { name: PROGRAMMING_LANGUAGE.c, img: c },
  { name: PROGRAMMING_LANGUAGE.cpp, img: cpp },
  { name: PROGRAMMING_LANGUAGE.go, img: go },
  { name: PROGRAMMING_LANGUAGE.python, img: py },
  { name: PROGRAMMING_LANGUAGE.php, img: php },
  { name: PROGRAMMING_LANGUAGE.rust, img: rust },
  { name: PROGRAMMING_LANGUAGE.bash, img: sh },
];

// Sample durations
export const EXAM_DURATIONS: Array<{ duration: string }> = [
  { duration: "15" },
  { duration: "30" },
  { duration: "60" },
  { duration: "90" },
  { duration: "120" },
  { duration: "150" },
  { duration: "180" },
];

export const EXAM_STATUS_OPTIONS = Object.values(EXAM_STATUS).map((status: ExamStatus) => ({
  value: status,
  label: parseExamStatus(status),
}));

export const MAX_TASK_INPUTS = 4;

export const EXAM_RESULTS_COLUMNS = {
  lg: [
    { key: "student", label: "Student" },
    { key: "timestamp", label: "Submitted At" },
    { key: "status", label: "Status" },
    { key: "actions", label: "More" },
  ] as const,

  sm: [
    { key: "student", label: "Student" },
    { key: "status", label: "Status" },
    { key: "actions", label: "More" },
  ] as const,
} satisfies Record<string, Column[]>;
