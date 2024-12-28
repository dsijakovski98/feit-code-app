import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

export const useStudentSubmissions = (studentId: string) => {
  return useQuery({
    queryKey: [{ name: "submissions", studentId }],
    queryFn: async () => {
      const submissions = await db.query.submissions.findMany({
        where: (submissions, { eq }) => {
          return eq(submissions.studentId, studentId);
        },
        with: { exam: { with: { course: { columns: { id: true } } } } },
      });

      return submissions;
    },
  });
};
