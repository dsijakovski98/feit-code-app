import { and, eq } from "drizzle-orm";

import { courses, studentCourses } from "@/db/schema";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { calculateGrade } from "@/utils/courses/grade";
import { deleteCourseFolder } from "@/utils/courses/storage";

type StudentOptions = {
  courseId: string;
  studentId: string;
};
export const joinCourse = async ({ courseId, studentId }: StudentOptions) => {
  try {
    await db.insert(studentCourses).values({ courseId, studentId });
  } catch (e) {
    // Sentry logging
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
    // Sentry logging
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
    // Sentry logging
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
    // Sentry logging
    console.log({ e });

    throw new Error("Failed to delete course!");
  }

  return true;
};

type CourseGradeOptions = {
  studentId: string;
  courseId: string;
};
export const getCourseGrade = async ({ studentId, courseId }: CourseGradeOptions) => {
  const examsData = await db.query.exams.findMany({
    where: (exams, { eq, and }) => {
      const courseFilter = eq(exams.courseId, courseId);
      const statusFilter = eq(exams.status, EXAM_STATUS.completed);

      return and(statusFilter, courseFilter);
    },
    columns: { id: true, points: true },
    with: {
      submissions: {
        where: (submissions, { eq, and }) => {
          const studentFilter = eq(submissions.studentId, studentId);
          const statusFilter = eq(submissions.status, SUBMISSION_STATUS.graded);

          return and(studentFilter, statusFilter);
        },
        columns: { id: true, points: true },
      },
    },
  });

  if (examsData?.length === 0) return null;

  const takenExams = examsData.filter((exam) => !!exam.submissions.length);
  const totalPoints = takenExams.reduce((acc, exam) => acc + exam.points, 0);

  const points = takenExams.reduce((acc, exam) => {
    const { submissions } = exam;
    const submission = submissions[0];

    if (!submission) return acc;

    return acc + submission.points!;
  }, 0);

  return calculateGrade({ totalPoints, points });
};
