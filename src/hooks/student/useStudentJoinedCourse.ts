import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

export const useStudentJoinedCourse = (studentId: string | undefined, courseId: string) => {
  return useQuery({
    queryKey: [{ name: "courses", type: "joined", studentId, courseId }],
    queryFn: async () => {
      if (!studentId) return null;

      try {
        const joinedCourse = await db.query.studentCourses.findFirst({
          where: (studentCourses, { eq, and }) =>
            and(eq(studentCourses.studentId, studentId), eq(studentCourses.courseId, courseId)),
        });

        return joinedCourse ?? null;
      } catch (e) {
        // Sentry logging
        console.log({ e });

        throw new Error("Failed to find course");
      }
    },
  });
};

export type JoinedCourse = NonNullable<ReturnType<typeof useStudentJoinedCourse>["data"]>;
