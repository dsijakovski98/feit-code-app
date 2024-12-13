import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

export const useExamDetails = (examId?: string) => {
  return useQuery({
    queryKey: [{ name: "exams", examId }],
    queryFn: async () => {
      if (!examId) return null;

      try {
        const exam = await db.query.exams.findFirst({
          where: (exams, { eq }) => eq(exams.id, examId),
          with: {
            tasks: { orderBy: (tasks, { asc }) => asc(tasks.orderIndex) },
            course: {
              with: { professor: true },
            },
            submissions: {
              with: {
                student: true,
                sessionStats: true,
              },
            },
          },
        });

        if (!exam) {
          throw new Error("Exam not found!");
        }

        return exam;
      } catch (e) {
        // TODO: Sentry logging
        console.log({ e });

        if (e instanceof Error) {
          throw e;
        }

        throw new Error("Failed to get exam details!");
      }
    },
  });
};

export type ExamDetails = NonNullable<ReturnType<typeof useExamDetails>["data"]>;
