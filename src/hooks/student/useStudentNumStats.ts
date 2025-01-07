import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { NumStats } from "@/types/stats";

export const useStudentNumStats = (studentId: string) => {
  return useQuery({
    queryKey: [{ name: "num-stats", studentId }],
    queryFn: async () => {
      if (!studentId) return null;

      const coursesData = await db.query.studentCourses.findMany({
        where: (studentCourses, { eq }) => eq(studentCourses.studentId, studentId),
        with: {
          course: {
            columns: { id: true },
            with: {
              exams: {
                with: {
                  submissions: { where: (submissions, { eq }) => eq(submissions.studentId, studentId) },
                },
              },
            },
          },
        },
        columns: {},
      });

      const numCourses = coursesData.length;

      const numExams = coursesData.reduce((acc, courseData) => {
        const validExams = courseData.course.exams.filter((exam) => !!exam.submissions.length);

        return acc + validExams.length;
      }, 0);

      return { courses: numCourses, exams: numExams } satisfies NumStats;
    },
  });
};
