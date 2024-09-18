import { useInfiniteQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { USER_TYPE } from "@/types";
import { getAcademicYear } from "@/utils";

const COURSES_PER_PAGE = 5;
const currentAcademicYear = getAcademicYear();

export const useProfessorCourses = (userId: string, yearFilter: "all" | "current") => {
  return useInfiniteQuery({
    initialPageParam: 0,

    queryKey: [{ name: "courses", type: USER_TYPE.professor, userId, yearFilter }],
    queryFn: async ({ pageParam = 0 }) => {
      const coursesData = await db.query.courses.findMany({
        with: { students: { columns: { studentId: true } }, exams: { columns: { id: true } } },
        where: (courses, { eq }) => {
          return yearFilter === "current"
            ? eq(courses.academicYear, currentAcademicYear)
            : undefined;
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

export type ProfessorCourseType = NonNullable<
  ReturnType<typeof useProfessorCourses>["data"]
>["pages"][number][number];
