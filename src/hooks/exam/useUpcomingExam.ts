import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS } from "@/constants/enums";
import { db } from "@/db";

type Options = {
  courseIds: string[];
};

export const useUpcomingExam = ({ courseIds }: Options) => {
  return useQuery({
    queryKey: [{ name: "upcoming-exam", courseIds }],
    queryFn: async () => {
      if (!courseIds.length) return null;

      const upcomingExam = await db.query.exams.findFirst({
        where: (exams, { eq, inArray, and }) => {
          const courseFilter = inArray(exams.courseId, courseIds);
          const statusFilter = eq(exams.status, EXAM_STATUS.new);

          return and(courseFilter, statusFilter);
        },
        columns: { id: true, name: true, language: true, startsAt: true },
        with: { course: { columns: { id: true, name: true } } },
      });

      return upcomingExam ?? null;
    },
  });
};

export type UpcomingExam = NonNullable<ReturnType<typeof useUpcomingExam>["data"]>;
