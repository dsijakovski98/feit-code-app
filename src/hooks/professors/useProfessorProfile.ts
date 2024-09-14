import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import { getAvatarUrl } from "@/services/avatars";

import { db } from "@/db";

export const useProfessorProfile = () => {
  const { userId } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "professor-profile", userId }],
    queryFn: async () => {
      if (!userId) return null;

      const professor = await db.query.professors.findFirst({
        where: (professors, { eq }) => eq(professors.id, userId),
      });

      if (!professor) {
        throw new Error("Professor not found!");
      }

      const avatarUrl = await getAvatarUrl(userId);

      return { ...professor, avatarUrl };
    },
  });

  return { professor: data, isLoading, error };
};

export type UseProfessorProfile = ReturnType<typeof useProfessorProfile>;
