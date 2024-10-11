import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { FCProfessor } from "@/hooks/useFCUser";
import { TEACHER_TYPE, USER_TYPE } from "@/types";
import { getAcademicYear } from "@/utils";

const currentAcademicYear = getAcademicYear();

type QueryOptions = {
  userId: string;
  type: FCProfessor["type"];
};

// Returns a regular list of courses for a given professor
export const useProfessorCoursesList = ({ userId, type }: QueryOptions) => {
  return useQuery({
    queryKey: [{ name: "courses-list", type: USER_TYPE.professor, id: userId }],
    queryFn: async () => {
      const courses = await db.query.courses.findMany({
        where: (courses, { eq, and }) => {
          const teacherColumn = type === TEACHER_TYPE.professor ? courses.professorId : courses.assistantId;
          const teacherFilter = eq(teacherColumn, userId);

          return and(
            teacherFilter,
            eq(courses.archived, false),
            eq(courses.academicYear, currentAcademicYear),
          );
        },
        orderBy: (courses, { asc }) => asc(courses.name),
      });

      return courses;
    },
  });
};
