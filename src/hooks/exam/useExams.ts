import { useInfiniteQuery } from "@tanstack/react-query";

import { ExamStatus } from "@/constants/enums";
import { EXAMS_PER_PAGE } from "@/constants/queries";
import { db } from "@/db";
import { UserType } from "@/types";

type QueryOptions = {
  userId: string;
  type: UserType;
  courseId?: string;
  status: string;
};

export const useExams = ({ userId, type, courseId, status }: QueryOptions) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    enabled: !!courseId,

    queryKey: [{ name: "exams", type, id: userId, courseId, status }],
    queryFn: async ({ pageParam = 0 }) => {
      if (!courseId) return [];

      const examsData = await db.query.exams.findMany({
        where: (exams, { eq, and }) => {
          const courseFilter = courseId !== "all" ? eq(exams.courseId, courseId) : undefined;
          const statusFilter = status !== "all" ? eq(exams.status, status as ExamStatus) : undefined;

          return and(courseFilter, statusFilter);
        },
        with: {
          course: {
            columns: { name: true, id: true },
            with: { professor: { columns: { firstName: true, lastName: true } } },
          },
          submissions: {
            limit: 1,
            where: (submissions, { eq }) => eq(submissions.studentId, userId),
            with: { grader: { columns: { firstName: true, lastName: true, email: true, avatarUrl: true } } },
            columns: {
              id: true,
              status: true,
              seen: true,
              graderId: true,
              feedback: true,
              points: true,
              submittedAt: true,
              studentId: true,
            },
          },
          tasks: { columns: { id: true } },
        },
        orderBy: (exams, { desc }) => desc(exams.createdAt),
        limit: EXAMS_PER_PAGE,
        offset: pageParam * EXAMS_PER_PAGE,
      });

      return examsData ?? [];
    },

    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length >= EXAMS_PER_PAGE ? ++lastPageParam : undefined;
    },
  });
};

export type ExamCard = NonNullable<ReturnType<typeof useExams>["data"]>["pages"][number][number];
