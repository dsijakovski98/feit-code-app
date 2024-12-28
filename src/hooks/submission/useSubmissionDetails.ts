import { useQuery } from "@tanstack/react-query";
import { getDownloadURL, ref as storageRef } from "firebase/storage";

import { fbStorage } from "@/services/firebase";

import { db } from "@/db";
import { studentTaskRef, taskTemplateRef } from "@/utils/code";

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

        with: { student: true, exam: { with: { tasks: { with: { tests: { with: { inputs: true } } } } } } },
      });

      if (!submission) {
        throw new Error("Submission not found!");
      }

      const { exam, student } = submission;
      const { id, firstName, lastName } = student;

      const tasksWithCode = await Promise.all(
        submission.exam.tasks.map(async (task) => {
          const taskPath = taskTemplateRef({
            examId,
            taskTitle: task.title,
            courseId: exam.courseId,
          });
          const studentPath = studentTaskRef({ id, firstName, lastName });
          const templateRef = storageRef(fbStorage, `${taskPath}/${studentPath}`);

          const url = await getDownloadURL(templateRef);
          const response = await fetch(url);
          const code = await response.text();

          return { ...task, code };
        }),
      );

      return { ...submission, exam: { ...submission.exam, tasks: tasksWithCode } };
    },
  });
};

export type SubmissionDetails = NonNullable<ReturnType<typeof useSubmissionDetails>["data"]>;
