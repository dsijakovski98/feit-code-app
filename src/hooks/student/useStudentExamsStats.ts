import { useQuery } from "@tanstack/react-query";

import { EXAM_STATUS, SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { ExamKey, ExamsStats } from "@/types/stats";

type Options = {
  studentId: string;
  courseIds: string[];
};

export const useStudentExamsStats = ({ studentId, courseIds }: Options) => {
  return useQuery({
    queryKey: [{ name: "student-exams-stats", studentId, courseIds }],
    queryFn: async () => {
      const coursesData = await db.query.courses.findMany({
        where: (courses, { eq, inArray, and }) => {
          const idFilter = inArray(courses.id, courseIds);
          const statusFilter = eq(courses.archived, false);

          return and(idFilter, statusFilter);
        },
        columns: { name: true, id: true },
        with: {
          exams: {
            limit: 10,
            where: (exams, { eq }) => eq(exams.status, EXAM_STATUS.completed),
            columns: { name: true, points: true },
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

      if (coursesData?.length === 0) return null;

      const stats: ExamsStats = [];

      coursesData.forEach((courseData) => {
        if (courseData.exams.length === 0) return;

        const { name, id, exams } = courseData;
        const stat: ExamsStats[number] = { course: name, courseId: id, exams: {} };

        exams.forEach((exam, idx) => {
          const examKey: ExamKey = `exam${idx + 1}`;
          const submission = exam.submissions[0];

          if (!submission) return;

          const percentage = Math.round((submission.points! / exam.points) * 100);

          stat[examKey] = percentage;
          stat.exams[examKey] = exam.name;
        });

        if (Object.keys(stat.exams).length > 0) {
          stats.push(stat);
        }
      });

      if (stats.length === 0) return null;

      return stats;
    },
  });
};
