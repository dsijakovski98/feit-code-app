import { useInfiniteQuery } from "@tanstack/react-query";
import { desc, eq } from "drizzle-orm";

import { courses, studentCourses } from "@/db/schema";

import { COURSES_PER_PAGE } from "@/constants/queries";
import { db } from "@/db";
import { USER_TYPE } from "@/types";

export const useStudentCourses = (studentId: string) => {
  return useInfiniteQuery({
    initialPageParam: 0,

    queryKey: [{ name: "courses", type: USER_TYPE.student, studentId }],
    queryFn: async ({ pageParam = 0 }) => {
      const coursesData = await db
        .select({
          id: studentCourses.courseId,
          course: courses,
          joinedAt: studentCourses.joinedAt,
          grade: studentCourses.grade,
        })
        .from(studentCourses)
        .innerJoin(courses, eq(courses.id, studentCourses.courseId))
        .where(eq(studentCourses.studentId, studentId))
        .orderBy(desc(studentCourses.joinedAt))
        .limit(COURSES_PER_PAGE)
        .offset(pageParam * COURSES_PER_PAGE);

      return coursesData;
    },

    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length >= COURSES_PER_PAGE ? ++lastPageParam : undefined;
    },
  });
};

export type StudentCourseType = NonNullable<
  ReturnType<typeof useStudentCourses>["data"]
>["pages"][number][number];
