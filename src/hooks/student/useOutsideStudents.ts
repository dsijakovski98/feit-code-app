import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

// Fetching list of students NOT in a particular course
// In this case this is represented via the joinedIds list of student IDs

// TODO: Use pagination once a larger user base is established
export const useOutsideStudents = (joinedIds: string[]) => {
  return useQuery({
    queryKey: [{ name: "students", joinedIds }],
    queryFn: async () => {
      try {
        const students = await db.query.students.findMany({
          where: (students, { notInArray }) => notInArray(students.id, joinedIds),
        });

        return students;
      } catch (e) {
        // Sentry logging
        console.log({ e });

        throw new Error("Failed to find students list outside of this course!");
      }
    },
  });
};
