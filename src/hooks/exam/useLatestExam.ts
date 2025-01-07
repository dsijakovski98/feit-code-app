import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS } from "@/constants/enums";
import { db } from "@/db";

type Options = {
  courseId?: string;
  upcoming?: boolean;
};

export const useLatestExam = ({ courseId, upcoming = false }: Options) => {
  return useQuery({
    queryKey: [{ name: "latest-exam", courseId, upcoming }],
    queryFn: async () => {
      try {
        const latestExam = await db.query.exams.findFirst({
          where: (exams, { eq, and }) => {
            const upcomingFilter = eq(exams.status, EXAM_STATUS.new);
            const courseFilter = courseId ? eq(exams.courseId, courseId) : undefined;

            if (!upcoming) return courseFilter;

            return and(courseFilter, upcomingFilter);
          },
          with: { course: { columns: { name: true } } },
          orderBy: (exams, { desc }) => desc(exams.createdAt),
        });

        return latestExam ?? null;
      } catch (e) {
        // Sentry logging
        console.log({ e });

        throw new Error("Failed to get latest exam!");
      }
    },
  });
};
