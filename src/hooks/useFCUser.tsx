import { useEffect } from "react";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";

import { db } from "@/db";
import { USER_TYPE } from "@/types";

const userColumns = {
  id: true,
  avatarUrl: true,
  email: true,
  firstName: true,
  lastName: true,
} as const;

export const useFCUser = () => {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    enabled: !!user?.id,
    queryKey: [{ name: "user", id: user?.id }],
    queryFn: async () => {
      if (!user?.id) return null;

      const studentAttempt = await db.query.students.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        columns: userColumns,
      });

      if (studentAttempt) return { fcUser: studentAttempt, type: USER_TYPE.student };

      const professorAttempt = await db.query.professors.findFirst({
        where: (professors, { eq }) => eq(professors.id, user.id),
        columns: userColumns,
      });

      if (professorAttempt) return { fcUser: professorAttempt, type: USER_TYPE.professor };

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
