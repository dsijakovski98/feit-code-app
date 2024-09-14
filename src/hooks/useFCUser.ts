import { useEffect } from "react";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import { getAvatarUrl } from "@/services/avatars";

import { db } from "@/db";
import { USER_TYPE } from "@/types";

const userColumns = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
} as const;

export const useFCUser = () => {
  const { userId } = useAuth();

  const { data, isLoading, error } = useQuery({
    enabled: !!userId,
    queryKey: [{ name: "user", userId }],
    queryFn: async () => {
      if (!userId) return null;

      const avatarUrl = await getAvatarUrl(userId);

      const studentAttempt = await db.query.students.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
        columns: userColumns,
      });

      if (studentAttempt) {
        return { user: { ...studentAttempt, avatarUrl }, type: USER_TYPE.student };
      }

      const professorAttempt = await db.query.professors.findFirst({
        where: (professors, { eq }) => eq(professors.id, userId),
        columns: userColumns,
      });

      if (professorAttempt) {
        return { user: { ...professorAttempt, avatarUrl }, type: USER_TYPE.professor };
      }

      throw new Error("User not found!");
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return { userData: data, isLoading, error };
};

export type UseFCUser = ReturnType<typeof useFCUser>;
export type FCUser = UseFCUser["userData"];
