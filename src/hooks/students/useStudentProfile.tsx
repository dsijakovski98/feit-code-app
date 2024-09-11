import { useQuery } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";

import { db } from "@/db";

export const useStudentProfile = () => {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    enabled: !!user?.id,
    queryKey: [{ name: "student-profile", id: user?.id }],
    queryFn: async () => {
      if (!user?.id) return null;

      const student = await db.query.students.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
      });

      if (!student) {
        throw new Error("Student not found!");
      }

      return student;
    },
  });

  return { student: data, isLoading, error };
};

export type UseStudentProfile = ReturnType<typeof useStudentProfile>;
