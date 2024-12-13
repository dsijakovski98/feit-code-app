import { useQuery } from "@tanstack/react-query";

import { getOngoingExam } from "@/actions/exams";
import { db } from "@/db";
import { USER_TYPE } from "@/types";

export const useStudentOngoingExam = (studentId: string) => {
  return useQuery({
    queryKey: [{ name: "ongoing-exam", userId: studentId, type: USER_TYPE.student }],
    queryFn: async () => {
      const submissions = await db.query.submissions.findMany({
        where: (submissions, { eq }) => eq(submissions.studentId, studentId),
        columns: { examId: true },
      });
      const submissionExamIds = new Set(submissions.map((submission) => submission.examId));

      const courseExams = await db.query.studentCourses.findMany({
        where: (studentCourses, { eq }) => eq(studentCourses.studentId, studentId),

        columns: {},
        with: { course: { columns: {}, with: { exams: { columns: { id: true } } } } },
      });

      const allExamIds = new Set(courseExams.flatMap((item) => item.course.exams.map((exam) => exam.id)));

      const examIds = [...allExamIds.difference(submissionExamIds)];
      const ongoingExam = await getOngoingExam(examIds);

      return ongoingExam;
    },
  });
};
