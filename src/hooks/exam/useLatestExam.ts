import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

export const useLatestExam = (courseId: string) => {
  return useQuery({
    queryKey: [{ name: "latest-exam", courseId }],
    queryFn: async () => {
      try {
        const latestExam = await db.query.exams.findFirst({
          where: (exams, { eq }) => eq(exams.courseId, courseId),
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
