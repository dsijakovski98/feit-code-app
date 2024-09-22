import { useInfiniteQuery } from "@tanstack/react-query";

import { COURSES_PER_PAGE } from "@/constants/queries";
import { db } from "@/db";
import { getAcademicYear } from "@/utils";

const currentAcademicYear = getAcademicYear();

export const useActiveCourses = () => {
  return useInfiniteQuery({
    initialPageParam: 0,

    queryKey: [{ name: "courses", type: "active" }],
    queryFn: async ({ pageParam = 0 }) => {
      const coursesData = await db.query.courses.findMany({
        with: {
          professor: true,
          categories: { with: { category: true }, columns: { courseId: false } },
        },
        where: (courses, { eq, and }) => {
          return and(eq(courses.archived, false), eq(courses.academicYear, currentAcademicYear));
        },
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
