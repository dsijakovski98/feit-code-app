import { useQuery } from "@tanstack/react-query";
import { and, count, eq } from "drizzle-orm";

import { submissions } from "@/db/schema";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";

export const useProfessorSubmissionsGraded = (professorId: string) => {
  return useQuery({
    queryKey: [{ name: "submissions-graded", professorId }],
    queryFn: async () => {
      if (!professorId) return null;

      const [{ submissionsGraded }] = await db
        .select({
          submissionsGraded: count(),
        })
        .from(submissions)
        .where(and(eq(submissions.graderId, professorId), eq(submissions.status, SUBMISSION_STATUS.graded)));

      return submissionsGraded;
    },
  });
};
