import { useQuery } from "@tanstack/react-query";

import { getCourseGrade } from "@/actions/courses";
import { db } from "@/db";
import { CourseStats } from "@/types/stats";

export const useStudentCoursesStats = (studentId: string) => {
  return useQuery({
    queryKey: [{ name: "student-courses-stats", studentId }],
    queryFn: async () => {
      const coursesData = await db.query.studentCourses.findMany({
        where: (studentCourses, { eq }) => eq(studentCourses.studentId, studentId),
        columns: { courseId: true },
        with: { course: { columns: { name: true, archived: true } } },
      });

      const activeCourses = coursesData.filter((courseData) => !courseData.course.archived);

      if (activeCourses?.length === 0) return null;

      const stats = await Promise.all(
        activeCourses.map<Promise<CourseStats[number] | null>>(async ({ courseId, course }) => {
          const grade = await getCourseGrade({ studentId, courseId });

          if (!grade) return null;

          return { course: course.name, value: grade };
        }),
      );

      return stats.filter(Boolean) as CourseStats;
    },
  });
};
