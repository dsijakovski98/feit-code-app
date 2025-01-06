import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";

type Options = {
  studentId: string;
  selectedCourseId: "all" | (string & {});
  courseIds: string[];
};

export const useStudentExamsStats = ({ studentId, selectedCourseId, courseIds }: Options) => {
  const targetCourseIds = selectedCourseId === "all" ? courseIds : [selectedCourseId];

  return useQuery({
    queryKey: [{ name: "student-exams-stats", studentId, selectedCourseId }],
    queryFn: async () => {
      const coursesData = await db.query.courses.findMany({
        where: (courses, { inArray }) => inArray(courses.id, targetCourseIds),
        columns: { name: true, id: true },
        with: {
          exams: {
            limit: 10,
            where: (exams, { eq }) => eq(exams.status, EXAM_STATUS.completed),
            columns: { name: true, language: true, points: true },
            with: {
              submissions: {
                where: (submissions, { eq, and }) => {
                  const studentFilter = eq(submissions.studentId, studentId);
                  const statusFilter = eq(submissions.status, SUBMISSION_STATUS.graded);

                  return and(studentFilter, statusFilter);
                },
              },
            },
          },
        },
      });

      const stats: StudentExamsStats = [];

      coursesData.forEach((courseData) => {
        if (courseData.exams.length === 0) return;

        const stat: StudentExamsStats[number] = { course: courseData.name, exams: {} };
        courseData.exams.forEach((exam, idx) => {
          const examKey: ExamKey = `exam${idx + 1}`;
          const submission = exam.submissions[0];

          if (!submission) return;

          const percentage = Math.round((submission.points! / exam.points) * 100);

          stat[examKey] = percentage;
          stat.exams[examKey] = exam.name;
        });

        if (Object.keys(stat).length > 1) {
          stats.push(stat);
        }
      });

      const examKeys = [
        ...new Set(
          stats.flatMap((stat) => Object.keys(stat).filter((key) => key !== "course" && key !== "exams")),
        ),
      ];

      return { stats, examKeys };
    },
  });
};

type ExamKey = `exam${number}`;
export type StudentExamsStats = Array<
  { course: string; exams: Record<ExamKey, string> } & { [key in ExamKey]: number }
>;
