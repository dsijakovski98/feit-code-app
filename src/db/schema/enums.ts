import { pgEnum } from "drizzle-orm/pg-core";

import { EXAM_STATUS, PROGRAMMING_LANGUAGE, TASK_STATUS } from "@/constants/enums";
import { MAJOR_TYPE } from "@/constants/students";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

export const userType = pgEnum("user_type", [USER_TYPE.student, USER_TYPE.professor]);

export const moduleType = pgEnum("module_type", [
  MAJOR_TYPE.KTI,
  MAJOR_TYPE.KSIAR,
  MAJOR_TYPE.KHIE,
  MAJOR_TYPE.TKII,
]);

export const teacherType = pgEnum("teacher_type", [TEACHER_TYPE.professor, TEACHER_TYPE.assistant]);

export const programmingLanguage = pgEnum("programming_language", [
  PROGRAMMING_LANGUAGE.javascript,
  PROGRAMMING_LANGUAGE.typescript,
  PROGRAMMING_LANGUAGE.c,
  PROGRAMMING_LANGUAGE.cpp,
  PROGRAMMING_LANGUAGE.bash,
  PROGRAMMING_LANGUAGE.go,
  PROGRAMMING_LANGUAGE.python,
  PROGRAMMING_LANGUAGE.rust,
  PROGRAMMING_LANGUAGE.php,
]);

export const examStatus = pgEnum("exam_status", [
  EXAM_STATUS.new,
  EXAM_STATUS.ongoing,
  EXAM_STATUS.completed,
]);

export const taskStatus = pgEnum("task_status", [
  TASK_STATUS.submitted,
  TASK_STATUS.inProgress,
  TASK_STATUS.graded,
]);
