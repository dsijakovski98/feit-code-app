import { and, eq } from "drizzle-orm";

import { courses, studentCourses } from "@/db/schema";

import { db } from "@/db";
import { deleteCourseFolder } from "@/utils/courses/storage";

type StudentOptions = {
  courseId: string;
  studentId: string;
};
export const joinCourse = async ({ courseId, studentId }: StudentOptions) => {
  try {
    await db.insert(studentCourses).values({ courseId, studentId });
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to join course!");
  }

  return true;
};

export const leaveCourse = async ({ courseId, studentId }: StudentOptions) => {
  try {
    await db
      .delete(studentCourses)
      .where(and(eq(studentCourses.courseId, courseId), eq(studentCourses.studentId, studentId)));
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to leave course!");
  }

  return true;
};

type ArchiveOptions = {
  courseId: string;
  archived: boolean;
};
export const archiveCourseToggle = async ({ courseId, archived }: ArchiveOptions) => {
  try {
    await db.update(courses).set({ archived }).where(eq(courses.id, courseId));
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error(`Failed to ${archived ? "archive" : "activate"} course!`);
  }

  return true;
};

export const deleteCourse = async (courseId: string) => {
  try {
    await Promise.all([
      deleteCourseFolder(`course_${courseId}`),
      db.delete(courses).where(eq(courses.id, courseId)),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to delete course!");
  }

  return true;
};
