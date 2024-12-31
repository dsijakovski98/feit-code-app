import { useQuery } from "@tanstack/react-query";
import { and, count, eq } from "drizzle-orm";

import { submissions } from "@/db/schema";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";

export const useFeedbackCount = (studentId?: string) => {
  return useQuery({
    enabled: !!studentId,
    queryKey: [{ name: "feedback-count", studentId }],
    queryFn: async () => {
      if (!studentId) return 0;

      const feedbackCount = await db
        .select({ count: count() })
        .from(submissions)
        .where(
          and(
            eq(submissions.studentId, studentId),
            eq(submissions.status, SUBMISSION_STATUS.graded),
            eq(submissions.seen, false),
          ),
        )
        .limit(1);

      return feedbackCount[0].count ?? null;
    },
  });
};
