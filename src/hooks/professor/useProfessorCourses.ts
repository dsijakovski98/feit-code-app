import { useInfiniteQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { USER_TYPE } from "@/types";

const COURSES_PER_PAGE = 5;

export const useProfessorCourses = (userId: string) => {
  return useInfiniteQuery({
    initialPageParam: 0,

    queryKey: [{ name: "courses", type: USER_TYPE.professor, userId }],
    queryFn: async ({ pageParam = 0 }) => {
      const coursesData = await db.query.courses.findMany({
        with: { students: { columns: { studentId: true } }, exams: { columns: { id: true } } },
        orderBy: (courses, { desc }) => desc(courses.updatedAt),
        limit: COURSES_PER_PAGE,
        offset: pageParam * COURSES_PER_PAGE,
      });

      return coursesData;
    },

    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length >= COURSES_PER_PAGE ? ++lastPageParam : undefined;
    },
  });
};

export type ProfessorCourseType = NonNullable<
  ReturnType<typeof useProfessorCourses>["data"]
>["pages"][number][number];
