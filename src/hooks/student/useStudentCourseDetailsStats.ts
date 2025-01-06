import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";

type Options = {
  studentId: string;
  courseId: string;
};

export const useStudentCourseDetailsStats = ({ studentId, courseId }: Options) => {
  return useQuery({
    queryKey: [{ name: "student-course-details-stats", courseId, studentId }],
    queryFn: async () => {
      const studentJoined = await db.query.studentCourses.findFirst({
        where: (studentCourses, { and, eq }) => {
          return and(eq(studentCourses.courseId, courseId), eq(studentCourses.studentId, studentId));
        },
      });

      if (!studentJoined) return null;

      const examsData = await db.query.exams.findMany({
        where: (exams, { eq, and }) => {
          const courseFilter = eq(exams.courseId, courseId);
          const statusFilter = eq(exams.status, EXAM_STATUS.completed);

          return and(courseFilter, statusFilter);
        },
        columns: { id: true },
      });

      if (!examsData) return null;

      const examIds = examsData.map((exam) => exam.id);

      const submissionsData = await db.query.submissions.findMany({
        where: (submissions, { eq, inArray, and }) => {
          const examFilter = inArray(submissions.examId, examIds);
          const studentFilter = eq(submissions.studentId, studentId);
          const statusFilter = eq(submissions.status, SUBMISSION_STATUS.graded);

          return and(examFilter, studentFilter, statusFilter);
        },
        columns: { points: true },
        with: { exam: { columns: { points: true, name: true, language: true } } },

        orderBy: (submissions, { asc }) => asc(submissions.submittedAt),
        limit: 10,
      });

      if (submissionsData.length === 0) return null;

      return submissionsData.map((submission) => {
        const { exam, points } = submission;
        const { name, language, points: totalPoints } = exam;

        const percentage = Math.round((points! / totalPoints) * 100);

        return { exam: `${name}・${language}`, totalPoints: totalPoints - points!, points, percentage };
      });
    },
  });
};

export type StudentCourseStats = NonNullable<ReturnType<typeof useStudentCourseDetailsStats>["data"]>;
