import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { NumStats } from "@/types/stats";

export const useProfessorNumStats = (professorId: string) => {
  return useQuery({
    queryKey: [{ name: "num-stats", professorId }],
    queryFn: async () => {
      if (!professorId) return null;

      const coursesData = await db.query.courses.findMany({
        where: (courses, { eq, or }) => {
          const professorFilter = eq(courses.professorId, professorId);
          const assistantFilter = eq(courses.assistantId, professorId);

          return or(professorFilter, assistantFilter);
        },
        columns: {},
        with: {
          exams: {
            columns: { id: true },
          },
        },
      });

      const numCourses = coursesData.length;
      const numExams = coursesData.reduce((acc, courseData) => acc + courseData.exams.length, 0);

      return { courses: numCourses, exams: numExams } satisfies NumStats;
    },
  });
};
