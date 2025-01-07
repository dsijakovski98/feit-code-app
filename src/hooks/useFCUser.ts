import { useEffect } from "react";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import { db } from "@/db";
import { TeacherType, USER_TYPE } from "@/types";

const userColumns = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatarUrl: true,
} as const;

export const useFCUser = () => {
  const { userId } = useAuth();

  const { data, isLoading, error } = useQuery({
    enabled: !!userId,
    queryKey: [{ name: "user", userId }],
    queryFn: async () => {
      if (!userId) return null;

      const student = await db.query.students.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
        columns: userColumns,
      });

      if (student) {
        return { user: student, type: USER_TYPE.student };
      }

      const professor = await db.query.professors.findFirst({
        where: (professors, { eq }) => eq(professors.id, userId),
        columns: { ...userColumns, type: true },
      });

      if (professor) {
        return { user: professor, type: USER_TYPE.professor };
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

export type FCStudent = NonNullable<FCUser>["user"];
export type FCProfessor = NonNullable<FCUser>["user"] & {
  type: TeacherType;
};
