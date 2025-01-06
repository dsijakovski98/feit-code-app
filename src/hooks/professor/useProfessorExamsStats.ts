import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { ExamKey, ExamsStats } from "@/types/stats";

export const useProfessorExamsStats = (professorId: string) => {
  return useQuery({
    queryKey: [{ name: "professor-exams-stats", professorId }],
    queryFn: async () => {
      const coursesData = await db.query.courses.findMany({
        where: (courses, { eq, or, and }) => {
          const professorFilter = eq(courses.professorId, professorId);
          const assistantFilter = eq(courses.assistantId, professorId);
          const teacherFilter = or(professorFilter, assistantFilter);

          const statusFilter = eq(courses.archived, false);

          return and(teacherFilter, statusFilter);
        },
        columns: { name: true, id: true },
        with: {
          exams: {
            limit: 10,
            where: (exams, { eq }) => eq(exams.status, EXAM_STATUS.completed),
            columns: { name: true, points: true },
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

      const stats: ExamsStats = [];

      coursesData.forEach((courseData) => {
        if (courseData.exams.length === 0) return;

        const { name, id, exams } = courseData;
        const stat: ExamsStats[number] = { course: name, courseId: id, exams: {} };

        exams.forEach((exam, idx) => {
          const { submissions, points: totalPoints } = exam;

          if (submissions.length === 0) return;

          const examKey: ExamKey = `exam${idx + 1}`;

          const avgPoints = submissions.reduce((acc, sub) => acc + sub.points!, 0) / submissions.length;
          const percentage = Math.round((avgPoints / totalPoints) * 100);

          stat[examKey] = percentage;
          stat.exams[examKey] = exam.name;
        });

        if (Object.keys(stat).length > 1) {
          stats.push(stat);
        }
      });

      if (stats.length === 0) return null;

      return stats;
    },
  });
};
