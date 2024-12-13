import { useQuery } from "@tanstack/react-query";

import { getOngoingExam } from "@/actions/exams";
import { db } from "@/db";
import { USER_TYPE } from "@/types";

export const useProfessorOngoingExam = (professorId: string) => {
  return useQuery({
    queryKey: [{ name: "ongoing-exam", userId: professorId, type: USER_TYPE.professor }],
    queryFn: async () => {
      const courses = await db.query.courses.findMany({
        where: (courses, { eq, or }) => {
          const professorFilter = eq(courses.professorId, professorId);
          const assistantFilter = eq(courses.assistantId, professorId);

          return or(professorFilter, assistantFilter);
        },
        columns: {},
        with: { exams: { columns: { id: true } } },
      });

      const examIds = courses.flatMap((course) => course.exams.map((exam) => exam.id));
      const ongoingExam = await getOngoingExam(examIds);

      return ongoingExam;
    },
  });
};
