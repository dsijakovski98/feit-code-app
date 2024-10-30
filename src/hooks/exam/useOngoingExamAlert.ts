import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS } from "@/constants/enums";
import { db } from "@/db";

export const useOngoingExamAlert = (courseIds?: string[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "ongoing-exam", courseIds }],
    queryFn: async () => {
      try {
        if (!courseIds) return null;

        const ongoingExam = await db.query.exams.findFirst({
          with: { course: { columns: { name: true } } },
          where: (exams, { and, eq, inArray }) => {
            return and(eq(exams.status, EXAM_STATUS.ongoing), inArray(exams.courseId, courseIds));
          },
          orderBy: (exams, { desc }) => desc(exams.startedAt),
        });

        return ongoingExam;
      } catch (e) {
        // TODO: Sentry logging
        console.log({ e });

        throw new Error("Failed to find an ongoing exam!");
      }
    },
  });

  return { ongoingExam: data, isLoading, error };
};
