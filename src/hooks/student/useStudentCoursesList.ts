import { useQuery } from "@tanstack/react-query";
import { desc, eq } from "drizzle-orm";

import { courses, studentCourses } from "@/db/schema";

import { db } from "@/db";
import { USER_TYPE } from "@/types";

export const useStudentCoursesList = (studentId: string) => {
  return useQuery({
    queryKey: [{ name: "courses-list", type: USER_TYPE.student, studentId }],
    queryFn: async () => {
      const coursesData = await db
        .select({
          id: studentCourses.courseId,
          name: courses.name,
        })
        .from(studentCourses)
        .innerJoin(courses, eq(courses.id, studentCourses.courseId))
        .where(eq(studentCourses.studentId, studentId))
        .orderBy(desc(studentCourses.joinedAt));

      return coursesData;
    },
  });
};
