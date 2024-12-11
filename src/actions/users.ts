import { eq } from "drizzle-orm";
import { deleteObject, ref } from "firebase/storage";

import { UserResource } from "@clerk/types";

import { professors, students } from "@/db/schema";

import { ProfessorForm } from "@/components/Onboarding/Professor";
import { StudentForm } from "@/components/Onboarding/Student";

import { updateAvatar, uploadAvatar } from "@/services/avatars";
import { fbStorage } from "@/services/firebase";

import { db } from "@/db";
import { USER_TYPE, UserType } from "@/types";
import { splitFullName } from "@/utils";

type UserData = { user: UserResource; avatarUrl: string };

type StudentData = StudentForm & UserData;
export const createNewStudent = async ({
  user,
  fullName,
  bio,
  indexNumber,
  indexYear,
  major,
  avatarUrl,
}: StudentData) => {
  const { firstName, lastName } = splitFullName(fullName);

  try {
    await Promise.all([
      db.insert(students).values({
        id: user.id,
        email: user.primaryEmailAddress!.emailAddress,
        firstName,
        lastName,
        bio,
        indexNumber: Number(indexNumber),
        indexYear: Number(indexYear),
        major,
      }),
      uploadAvatar(user.id, avatarUrl),
      user.update({ unsafeMetadata: { onboardingComplete: true } }),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });
    throw new Error("Failed to add student!");
  }

  return true;
};

type UpdateStudentData = Omit<StudentData, "user"> & { userId: string };
export const updateStudent = async ({
  userId,
  fullName,
  bio,
  indexNumber,
  indexYear,
  major,
  avatarUrl,
}: UpdateStudentData) => {
  const { firstName, lastName } = splitFullName(fullName);

  try {
    await Promise.all([
      db
        .update(students)
        .set({
          firstName,
          lastName,
          bio,
          indexNumber: Number(indexNumber),
          indexYear: Number(indexYear),
          major,
        })
        .where(eq(students.id, userId)),
      updateAvatar(userId, avatarUrl),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });
    throw new Error("An error happened while updating your profile!");
  }
};

type ProfessorData = ProfessorForm & UserData;
export const createNewProfessor = async ({ user, fullName, department, type, avatarUrl }: ProfessorData) => {
  const { firstName, lastName } = splitFullName(fullName);

  try {
    await Promise.all([
      db.insert(professors).values({
        id: user.id,
        email: user.primaryEmailAddress!.emailAddress,
        firstName,
        lastName,
        department,
        type,
      }),
      uploadAvatar(user.id, avatarUrl),
      user.update({ unsafeMetadata: { onboardingComplete: true } }),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });
    throw new Error("Failed to add professor!");
  }

  return true;
};

type UpdateProfessorData = Omit<ProfessorData, "user"> & { userId: string };
export const updateProfessor = async ({
  userId,
  fullName,
  department,
  type,
  avatarUrl,
}: UpdateProfessorData) => {
  const { firstName, lastName } = splitFullName(fullName);

  try {
    await Promise.all([
      db
        .update(professors)
        .set({
          firstName,
          lastName,
          department,
          type,
        })
        .where(eq(professors.id, userId)),
      updateAvatar(userId, avatarUrl),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("An error happened while updating your profile!");
  }
};

export const resetPassword = async () => {
  return true;
};

type DeleteProfileConfig = { user: UserResource; type: UserType };
export const deleteProfile = async ({ user, type }: DeleteProfileConfig) => {
  const userId = user.id;
  const table = type === USER_TYPE.student ? students : professors;
  const avatarRef = ref(fbStorage, `avatars/${userId}`);

  try {
    await Promise.all([
      user.delete(),
      db.delete(table).where(eq(table.id, user.id)),
      deleteObject(avatarRef).catch(() => {}),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to delete user!");
  }

  return true;
};
