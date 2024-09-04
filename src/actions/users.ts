import { UserResource } from "@clerk/types";

import { StudentForm } from "@/components/Onboarding/Student";

import { db } from "@/db";
import { students } from "@/db/schema";

type StudentData = StudentForm & { user: UserResource; avatarUrl: string };
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
    await db.insert(students).values({
      id: user.id,
      email: user.primaryEmailAddress!.emailAddress,
      firstName,
      lastName: lastName.join(" "),
      bio,
      avatarUrl,
      indexNumber: Number(indexNumber),
      indexYear: Number(indexYear),
      major,
    });
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });
    throw new Error("Failed to add student!");
  }

  return true;
};
