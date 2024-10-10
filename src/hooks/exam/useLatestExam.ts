import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS } from "@/constants/enums";
import { db } from "@/db";

type Options = {
  courseId: string;
  upcoming?: boolean;
};

export const useLatestExam = ({ courseId, upcoming = false }: Options) => {
  return useQuery({
    queryKey: [{ name: "latest-exam", courseId }],
    queryFn: async () => {
      try {
        const latestExam = await db.query.exams.findFirst({
          where: (exams, { eq, and }) => {
            const idFilter = eq(exams.courseId, courseId);

            if (!upcoming) return idFilter;

            return and(idFilter, eq(exams.status, EXAM_STATUS.new));
          },
          orderBy: (exams, { desc }) => desc(exams.startsAt),
        });

        return latestExam ?? null;
      } catch (e) {
        // TODO: Sentry logging
        console.log({ e });

        throw new Error("Failed to get latest exam!");
      }
    },
  });
};
