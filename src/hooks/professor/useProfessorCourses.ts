import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { USER_TYPE } from "@/types";

export const useProfessorCourses = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "courses", type: USER_TYPE.professor, userId }],
    queryFn: async () => {
      const courses = await db.query.courses.findMany({
        where: (courses, { eq }) => eq(courses.professorId, userId),
      });

      return courses;
    },
  });

  return { courses: data, isLoading, error };
};
