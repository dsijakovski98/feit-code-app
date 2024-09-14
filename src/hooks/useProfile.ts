import { useQuery } from "@tanstack/react-query";
import { InferSelectModel } from "drizzle-orm";

import { useAuth } from "@clerk/clerk-react";

import { professors, students } from "@/db/schema";

import { getAvatarUrl } from "@/services/avatars";

import { db } from "@/db";
import { USER_TYPE, UserType } from "@/types";

type ProfileType<T extends UserType> = T extends "Student"
  ? InferSelectModel<typeof students>
  : T extends "Professor"
    ? InferSelectModel<typeof professors>
    : never;

export const useProfile = <T extends UserType>(type: T) => {
  const { userId } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "profile", type, userId }],
    queryFn: async () => {
      if (!userId) return null;

      const queryTable = type === USER_TYPE.student ? db.query.students : db.query.professors;
      const profile = await queryTable.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
      });

      if (!profile) {
        throw new Error(`${type} not found!`);
      }

      const avatarUrl = await getAvatarUrl(userId);

      return { ...(profile as ProfileType<T>), avatarUrl };
    },
  });

  return { profile: data, isLoading, error };
};

export type UseProfile<T extends UserType> = ReturnType<typeof useProfile<T>>;

export type UserProfile<T extends UserType> = NonNullable<NonNullable<UseProfile<T>>["profile"]>;
