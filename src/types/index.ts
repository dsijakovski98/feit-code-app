import { Dispatch, SetStateAction } from "react";

import { Extension } from "@uiw/react-codemirror";

import { ButtonProps } from "@nextui-org/react";

import { TestType } from "@/context/ExamFormContext";

export type RecordValues<T extends Record<string, unknown>> = T[keyof T];

export type QueryColumns<T> = Partial<Record<keyof T, boolean>>;

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export type ThemeColor = NonNullable<ButtonProps["color"]>;

export type Column = { key: string; label: string };
export type ColumnKey<T extends readonly Column[]> = T[number]["key"];

export const USER_TYPE = {
  student: "Student",
  professor: "Professor",
} as const;
export type UserType = RecordValues<typeof USER_TYPE>;

export const TEACHER_TYPE = {
  professor: "Course Professor",
  assistant: "Teaching Assistant",
} as const;
export type TeacherType = RecordValues<typeof TEACHER_TYPE>;

export type LanguageConfig = {
  comment: string;
  funcPrefix: string;
  emptyValue?: string;
  extension: Extension;
} & (
  | { supportsTests: true; parseIO: (test: Omit<TestType, "id">) => { inputs: string[]; output: string } }
  | { supportsTests?: never }
);
