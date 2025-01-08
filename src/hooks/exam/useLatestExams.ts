import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

type Options = {
  limit: number;
  courseIds: string[];
};

export const useLatestExams = ({ courseIds, limit }: Options) => {
  return useQuery({
    queryKey: [{ name: "latest-exams", courseIds, limit }],
    queryFn: async () => {
      if (!courseIds.length) return null;

      const latestExams = await db.query.exams.findMany({
        where: (exams, { inArray }) => inArray(exams.courseId, courseIds),
        columns: { id: true, name: true, language: true, startsAt: true, status: true },
        with: {
          course: { columns: { id: true, name: true } },
        },

        limit,
        orderBy: (exams, { desc }) => desc(exams.createdAt),
      });

      return latestExams.length ? latestExams : null;
    },
  });
};
