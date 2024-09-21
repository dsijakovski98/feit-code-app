import { eq } from "drizzle-orm";

import { courses, studentCourses } from "@/db/schema";

import { db } from "@/db";

type JoinOptions = {
  courseId: string;
  studentId: string;
};
export const joinCourse = async ({ courseId, studentId }: JoinOptions) => {
  try {
    await db.insert(studentCourses).values({ courseId, studentId });
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to join course!");
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
    await db.delete(courses).where(eq(courses.id, courseId));
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to delete course!");
  }

  return true;
};
