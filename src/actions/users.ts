import { UserResource } from "@clerk/types";

import { ProfessorForm } from "@/components/Onboarding/Professor";
import { StudentForm } from "@/components/Onboarding/Student";

import { db } from "@/db";
import { professors, students } from "@/db/schema";

type UserData = { user: UserResource; avatarUrl: string };

type StudentData = StudentForm & UserData;
export const createNewStudent = async ({
  user,
  fullName,
  bio,
  avatarUrl,
  indexNumber,
  indexYear,
  major,
}: StudentData) => {
  const [firstName, ...lastName] = fullName.split(" ");

  try {
    await Promise.all([
      db.insert(students).values({
        id: user.id,
        email: user.primaryEmailAddress!.emailAddress,
        firstName,
        lastName: lastName.join(" "),
        bio,
        avatarUrl,
        indexNumber: Number(indexNumber),
        indexYear: Number(indexYear),
        major,
      }),
      user.update({ unsafeMetadata: { onboardingComplete: true } }),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });
    throw new Error("Failed to add student!");
  }

  return true;
};

type ProfessorData = ProfessorForm & UserData;
export const createNewProfessor = async ({
  user,
  fullName,
  avatarUrl,
  department,
  type,
}: ProfessorData) => {
  const [firstName, ...lastName] = fullName.split(" ");

  try {
    await Promise.all([
      db.insert(professors).values({
        id: user.id,
        email: user.primaryEmailAddress!.emailAddress,
        firstName,
        lastName: lastName.join(" "),
        avatarUrl,
        department,
        type,
      }),
      user.update({ unsafeMetadata: { onboardingComplete: true } }),
    ]);
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });
    throw new Error("Failed to add professor!");
  }

  return true;
};
