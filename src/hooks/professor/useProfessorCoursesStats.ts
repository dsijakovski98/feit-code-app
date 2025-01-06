import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { CourseStats } from "@/types/stats";

export const useProfessorCoursesStats = (professorId: string) => {
  return useQuery({
    queryKey: [{ name: "professor-courses-stats", professorId }],
    queryFn: async () => {
      const coursesData = await db.query.courses.findMany({
        where: (courses, { eq, or, and }) => {
          const professorFilter = eq(courses.professorId, professorId);
          const assistantFilter = eq(courses.assistantId, professorId);
          const teacherFilter = or(professorFilter, assistantFilter);

          const statusFilter = eq(courses.archived, false);

          return and(teacherFilter, statusFilter);
        },
        columns: { name: true },
        with: {
          exams: {
            where: (exams, { eq }) => eq(exams.status, EXAM_STATUS.completed),
            columns: { name: true, language: true, points: true },
            with: {
              submissions: {
                where: (submissions, { eq }) => eq(submissions.status, SUBMISSION_STATUS.graded),
                columns: { points: true },
              },
            },
          },
        },
      });

      if (coursesData?.length === 0) return null;

      const stats = await Promise.all(
        coursesData.map<CourseStats[number]>((courseData) => {
          const { name: courseName, exams } = courseData;

          const percentages = exams.map((exam) => {
            const { points: totalPoints, submissions } = exam;

            if (submissions.length === 0) return 0;

            const avgPoints = submissions.reduce((acc, sub) => acc + sub.points!, 0) / submissions.length;
            const percentage = Math.round((avgPoints / totalPoints) * 100);

            return percentage;
          });

          const percentage = percentages.length
            ? percentages.reduce((acc, percent) => acc + percent, 0) / percentages.length
            : 0;

          return { course: courseName, value: Number(percentage.toPrecision(2)) };
        }),
      );

      return stats.filter((stat) => stat.value > 0);
    },
  });
};
