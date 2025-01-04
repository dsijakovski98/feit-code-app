import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

type Options = {
  studentId: string;
  courseId: string;
};

export const useStudentExamHistory = ({ courseId, studentId }: Options) => {
  return useQuery({
    queryKey: [{ name: "exam-history", courseId, studentId }],
    queryFn: async () => {
      const examsData = await db.query.exams.findMany({
        where: (exams, { eq }) => eq(exams.courseId, courseId),
        columns: { id: true },
      });

      if (!examsData) return null;

      const examIds = examsData.map((exam) => exam.id);

      const examsHistory = await db.query.submissions.findMany({
        where: (submissions, { eq, inArray, and }) => {
          const studentFilter = eq(submissions.studentId, studentId);
          const examFilter = inArray(submissions.examId, examIds);

          return and(studentFilter, examFilter);
        },
        columns: { id: true, points: true, status: true, seen: true, submittedAt: true },
        with: { exam: { columns: { name: true, language: true, points: true, id: true } } },
        orderBy: (submissions, { desc }) => desc(submissions.submittedAt),
      });

      return examsHistory ?? null;
    },
  });
};

export type ExamHistory = NonNullable<ReturnType<typeof useStudentExamHistory>["data"]>;
