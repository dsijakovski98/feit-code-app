import { useQuery } from "@tanstack/react-query";
import { and, eq, inArray, sum } from "drizzle-orm";

import { submissions } from "@/db/schema";

import { EXAM_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { calculateGrade } from "@/utils/courses/grade";

type Options = {
  studentId: string;
  courseId: string;
};

export const useStudentCourseGrade = ({ studentId, courseId }: Options) => {
  return useQuery({
    queryKey: [{ name: "course-grade", courseId, studentId }],
    queryFn: async () => {
      const examsData = await db.query.exams.findMany({
        where: (exams, { eq, and }) => {
          const courseFilter = eq(exams.courseId, courseId);
          const statusFilter = eq(exams.status, EXAM_STATUS.completed);

          return and(statusFilter, courseFilter);
        },
        columns: { id: true, points: true },
      });

      if (!examsData) return null;

      const totalPoints = examsData.reduce((acc, exam) => acc + exam.points, 0);
      const examIds = examsData.map((exam) => exam.id);

      const [{ points }] = await db
        .select({ points: sum(submissions.points).mapWith(Number) })
        .from(submissions)
        .where(and(eq(submissions.studentId, studentId), inArray(submissions.examId, examIds)));

      if (points === null) return null;

      return calculateGrade({ totalPoints, points });
    },
  });
};
