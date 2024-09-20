import { eq } from "drizzle-orm";

import { courses } from "@/db/schema";

import { db } from "@/db";

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

    throw new Error("Failed to archive course!");
  }

  return true;
};
