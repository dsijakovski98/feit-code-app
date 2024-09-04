import { StudentForm } from "@/components/Onboarding/Student";

import { db } from "@/db";
import { students } from "@/db/schema";

type StudentData = StudentForm & { id: string; email: string; avatarUrl: string };
export const createNewStudent = async ({
  id,
  email,
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
      id,
      email,
      firstName,
      lastName: lastName.join(" "),
      bio,
      avatarUrl,
      indexNumber: Number(indexNumber),
      indexYear: Number(indexYear),
      major,
    });
  } catch (e) {
    console.log(e);
    throw new Error("Failed to add student!");
  }

  return true;
};
