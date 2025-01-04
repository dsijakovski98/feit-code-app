import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

type Options = {
  courseId: string;
};

export const useLatestExam = ({ courseId }: Options) => {
  return useQuery({
    queryKey: [{ name: "latest-exam", courseId }],
    queryFn: async () => {
      try {
        const latestExam = await db.query.exams.findFirst({
          where: (exams, { eq }) => {
            return eq(exams.courseId, courseId);
          },
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
