import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

export const useCourseDetails = (courseId?: string) => {
  return useQuery({
    queryKey: [{ name: "courses", courseId }],
    queryFn: async () => {
      if (!courseId) return null;

      try {
        const course = await db.query.courses.findFirst({
          with: {
            students: { with: { student: true } },
            exams: true,
            professor: true,
            assistant: true,
            categories: { with: { category: true } },
          },
          where: (courses, { eq }) => eq(courses.id, courseId),
        });

        if (!course) {
          throw new Error("Course not found!");
        }

        return course;
      } catch (e) {
        // Sentry logging
        console.log({ e });

        if (e instanceof Error) {
          throw e;
        }

        throw new Error("Failed to get course details!");
      }
    },
  });
};

export type CourseDetails = NonNullable<ReturnType<typeof useCourseDetails>["data"]>;
