import { and, eq } from "drizzle-orm";

import { studentCourses } from "@/db/schema";

import { db } from "@/db";
import { StudentOnboardingMajorSchema } from "@/utils/schemas/onboarding/studentOnboarding";

type IndexOptions = {
  studentData: StudentOnboardingMajorSchema;
  studentId?: string;
};

export const checkStudentIndex = async ({ studentData, studentId }: IndexOptions) => {
  const { indexNumber, indexYear } = studentData;

  const number = Number(indexNumber);
  const year = Number(indexYear);

  const existingStudent = await db.query.students.findFirst({
    where: (students, { and, eq, ne }) => {
      const indexFilter = and(eq(students.indexNumber, number), eq(students.indexYear, year));

      if (!studentId) return indexFilter;

      return and(indexFilter, ne(students.id, studentId));
    },
    columns: { indexNumber: true, indexYear: true },
  });

  if (existingStudent) {
    throw new Error(`A student with the index ${number}/${year} already exists!`);
  }
};

type AddOptions = {
  studentIds: string[];
  courseId: string;
};

export const addStudents = async ({ studentIds, courseId }: AddOptions) => {
  try {
    await db.insert(studentCourses).values(studentIds.map((studentId) => ({ studentId, courseId })));
  } catch (e) {
    // Sentry logging
    console.log({ e });

    throw new Error("Failed to add students to course!");
  }

  return true;
};

type RemoveOptions = {
  studentId: string;
  courseId: string;
};
export const removeStudent = async ({ studentId, courseId }: RemoveOptions) => {
  try {
    await db
      .delete(studentCourses)
      .where(and(eq(studentCourses.studentId, studentId), eq(studentCourses.courseId, courseId)));
    // Notify student of removal
  } catch (e) {
    // Sentry logging
    console.log({ e });

    throw new Error("Failed to remove student from course!");
  }

  return true;
};
