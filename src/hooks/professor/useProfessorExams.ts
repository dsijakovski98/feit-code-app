import { useInfiniteQuery } from "@tanstack/react-query";

import { ExamStatus } from "@/constants/enums";
import { EXAMS_PER_PAGE } from "@/constants/queries";
import { db } from "@/db";
import { USER_TYPE } from "@/types";

type QueryOptions = {
  userId: string;
  courseId: string;
  status: string;
};

export const useProfessorExams = ({ userId, courseId, status }: QueryOptions) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    enabled: !!courseId,

    queryKey: [{ name: "exams", type: USER_TYPE.professor, id: userId, courseId, status }],
    queryFn: async ({ pageParam = 0 }) => {
      const examsData = await db.query.exams.findMany({
        where: (exams, { eq, and }) => {
          const courseFilter = courseId !== "all" ? eq(exams.courseId, courseId) : undefined;
          const statusFilter = status !== "all" ? eq(exams.status, status as ExamStatus) : undefined;

          return and(courseFilter, statusFilter);
        },
        with: {
          course: {
            columns: { name: true },
            with: { professor: { columns: { firstName: true, lastName: true } } },
          },
          tasks: { columns: { id: true } },
        },
        orderBy: (exams, { desc }) => desc(exams.createdAt),
        limit: EXAMS_PER_PAGE,
        offset: pageParam * EXAMS_PER_PAGE,
      });

      return examsData;
    },

    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length >= EXAMS_PER_PAGE ? ++lastPageParam : undefined;
    },
  });
};