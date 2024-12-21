import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

type Options = {
  examId: string;
  studentId: string;
};

export const useSubmissionDetails = ({ examId, studentId }: Options) => {
  return useQuery({
    queryKey: [{ name: "submission", examId, studentId }],
    queryFn: async () => {
      const submission = await db.query.submissions.findFirst({
        where: (submissions, { eq, and }) => {
          const examFilter = eq(submissions.examId, examId);
          const studentFilter = eq(submissions.studentId, studentId);

          return and(examFilter, studentFilter);
        },

        with: { student: true, exam: true },
      });

      if (!submission) {
        throw new Error("Submission not found!");
      }

      return submission;
    },
  });
};

export type SubmissionDetails = NonNullable<ReturnType<typeof useSubmissionDetails>["data"]>;
