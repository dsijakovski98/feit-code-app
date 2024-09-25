import { and, eq } from "drizzle-orm";

import { studentCourses } from "@/db/schema";

import { db } from "@/db";

type RemoveOptions = {
  studentId: string;
  courseId: string;
};
export const removeStudent = async ({ studentId, courseId }: RemoveOptions) => {
  try {
    await db
      .delete(studentCourses)
      .where(and(eq(studentCourses.studentId, studentId), eq(studentCourses.courseId, courseId)));
    // TODO: Notify student of removal
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to remove student from course!");
  }

  return true;
};
