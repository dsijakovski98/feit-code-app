import { useQuery } from "@tanstack/react-query";

import { colors } from "@nextui-org/react";

import { ChartConfig } from "@/components/ui/shadcn/chart";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";

type Options = {
  studentId: string;
  courseId: string;
};

export const useStudentCourseStats = ({ studentId, courseId }: Options) => {
  const chartConfig = {
    totalPoints: { label: "Total Points", color: colors.dark.primary[400] },
    points: { label: "Points", color: colors.dark.primary[600] },
  } satisfies ChartConfig;

  const query = useQuery({
    queryKey: [{ name: "student-course-stats", courseId, studentId }],
    queryFn: async () => {
      const examsData = await db.query.exams.findMany({
        where: (exams, { eq, and }) => {
          const courseFilter = eq(exams.courseId, courseId);
          const statusFilter = eq(exams.status, EXAM_STATUS.completed);

          return and(courseFilter, statusFilter);
        },
        columns: { id: true },
      });

      if (!examsData) return null;

      const examIds = examsData.map((exam) => exam.id);

      const submissionsData = await db.query.submissions.findMany({
        where: (submissions, { eq, inArray, and }) => {
          const examFilter = inArray(submissions.examId, examIds);
          const studentFilter = eq(submissions.studentId, studentId);
          const statusFilter = eq(submissions.status, SUBMISSION_STATUS.graded);

          return and(examFilter, studentFilter, statusFilter);
        },
        columns: { points: true },
        with: { exam: { columns: { points: true, name: true, language: true } } },

        orderBy: (submissions, { desc }) => desc(submissions.submittedAt),
        limit: 10,
      });

      return submissionsData.map((submission) => {
        const { exam, points } = submission;
        const { name, language, points: totalPoints } = exam;

        return { exam: `${name}・${language}`, totalPoints, points };
      });
    },
  });

  return { chartConfig, ...query };
};
