import { Dispatch, SetStateAction } from "react";

export type RecordValues<T extends Record<string, unknown>> = T[keyof T];

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export const USER_TYPE = {
  student: "Student",
  professor: "Professor",
} as const;
export type UserType = RecordValues<typeof USER_TYPE>;

export const TEACHER_TYPE = {
  teacher: "Course Professor",
  assistant: "Teaching Assistant",
} as const;
export type TeacherType = RecordValues<typeof TEACHER_TYPE>;
