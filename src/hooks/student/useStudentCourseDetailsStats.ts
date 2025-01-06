import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { CourseDetailsStats } from "@/types/stats";

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
        columns: { id: true, points: true, name: true, language: true },
        with: {
          submissions: {
            columns: { points: true },
            where: (submissions, { eq, and }) => {
              const studentFilter = eq(submissions.studentId, studentId);
              const statusFilter = eq(submissions.status, SUBMISSION_STATUS.graded);

              return and(studentFilter, statusFilter);
            },
          },
        },

        limit: 10,
        orderBy: (exams, { asc }) => asc(exams.createdAt),
      });

      if (examsData?.length === 0) return null;

      return examsData.map<CourseDetailsStats[number]>((exam) => {
        const { name, language, points: totalPoints, submissions } = exam;
        const submission = submissions[0];
        const { points } = submission;

        const percentage = Math.round((points! / totalPoints) * 100);

        return { exam: `${name}・${language}`, totalPoints: totalPoints - points!, points, percentage };
      });
    },
  });
};
