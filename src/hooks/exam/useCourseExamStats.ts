import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, ExamStatus } from "@/constants/enums";
import { db } from "@/db";

export const useCourseExamStats = (courseId: string) => {
  return useQuery({
    queryKey: [{ name: "exam-stats", courseId }],
    queryFn: async () => {
      const exams = await db.query.exams.findMany({
        where: (exams, { eq }) => eq(exams.courseId, courseId),
        columns: { status: true },
      });

      return exams.reduce(
        (stats, exam) => {
          if (!stats[exam.status]) stats[exam.status] = 1;
          else stats[exam.status] += 1;

          return stats;
        },
        {
          [EXAM_STATUS.new]: 0,
          [EXAM_STATUS.ongoing]: 0,
          [EXAM_STATUS.completed]: 0,
        } as Record<ExamStatus, number>,
      );
    },
  });
};
