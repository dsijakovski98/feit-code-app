import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { CourseDetailsStats } from "@/types/stats";

type Options = {
  professorId: string;
  courseId: string;
};

export const useProfessorCourseDetailsStats = ({ professorId, courseId }: Options) => {
  return useQuery({
    queryKey: [{ name: "professor-course-details-stats", courseId, professorId }],
    queryFn: async () => {
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
            where: (submissions, { eq }) => eq(submissions.status, SUBMISSION_STATUS.graded),
          },
        },

        limit: 10,
        orderBy: (exams, { asc }) => asc(exams.createdAt),
      });

      if (examsData?.length === 0) return null;

      return examsData.map<CourseDetailsStats[number]>((exam) => {
        const { name, language, points: totalPoints, submissions } = exam;
        const avgPoints = submissions.reduce((acc, sub) => acc + sub.points!, 0) / submissions.length;
        const points = Number(avgPoints.toPrecision(2));

        const percentage = Math.round((points / totalPoints) * 100);

        return { exam: `${name}・${language}`, totalPoints: totalPoints - points, points, percentage };
      });
    },
  });
};
