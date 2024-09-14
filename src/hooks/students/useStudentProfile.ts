import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import { getAvatarUrl } from "@/services/avatars";

import { db } from "@/db";

export const useStudentProfile = () => {
  const { userId } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "student-profile", userId }],
    queryFn: async () => {
      if (!userId) return null;

      const student = await db.query.students.findFirst({
        where: (students, { eq }) => eq(students.id, userId),
      });

      if (!student) {
        throw new Error("Student not found!");
      }

      const avatarUrl = await getAvatarUrl(userId);

      return { ...student, avatarUrl };
    },
  });

  return { student: data, isLoading, error };
};

export type UseStudentProfile = ReturnType<typeof useStudentProfile>;
