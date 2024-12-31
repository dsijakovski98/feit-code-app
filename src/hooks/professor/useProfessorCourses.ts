import { useInfiniteQuery } from "@tanstack/react-query";

import { COURSES_PER_PAGE } from "@/constants/queries";
import { db } from "@/db";
import { FCProfessor } from "@/hooks/useFCUser";
import { TEACHER_TYPE, USER_TYPE } from "@/types";
import { getAcademicYear } from "@/utils";

const currentAcademicYear = getAcademicYear();

type QueryOptions = {
  userId: string;
  type: FCProfessor["type"];
};

// Returns a paginated list of courses for a given professor
export const useProfessorCourses = (options: QueryOptions, yearFilter: "all" | "current") => {
  const { userId, type } = options;
  return useInfiniteQuery({
    initialPageParam: 0,

    queryKey: [{ name: "courses", type: USER_TYPE.professor, id: userId, yearFilter }],
    queryFn: async ({ pageParam = 0 }) => {
      const coursesData = await db.query.courses.findMany({
        with: {
          professor: true,
          categories: { with: { category: true }, columns: { courseId: false } },
        },
        where: (courses, { eq, and }) => {
          const teacherColumn = type === TEACHER_TYPE.professor ? courses.professorId : courses.assistantId;
          const teacherFilter = eq(teacherColumn, userId);

          if (yearFilter === "all") return teacherFilter;

          return and(teacherFilter, eq(courses.academicYear, currentAcademicYear));
        },
        orderBy: (courses, { desc }) => desc(courses.updatedAt),
        limit: COURSES_PER_PAGE,
        offset: pageParam * COURSES_PER_PAGE,
      });

      return coursesData ?? null;
    },

    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length >= COURSES_PER_PAGE ? ++lastPageParam : undefined;
    },
  });
};
