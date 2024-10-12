import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { exams, tasks as tasksTable } from "@/db/schema";

import { fbStorage } from "@/services/firebase";

import { TaskType } from "@/context/ExamFormContext";
import { db } from "@/db";
import { ExamSchema } from "@/utils/formSchemas/exams/examSchema";

type ExamDates = Pick<ExamSchema, "startDate" | "startTime">;

const parseExamDates = ({ startDate, startTime }: ExamDates) => {
  const parsedDate = dayjs(startDate).format("YYYY-MM-DD");
  const parsedTime = dayjs(startTime).format("HH:MM");

  return `${parsedDate} ${parsedTime}`;
};

type CreateExamOptions = {
  courseId: string;
  exam: ExamSchema;
  tasks: TaskType[];
};
export const createExam = async ({ courseId, exam, tasks }: CreateExamOptions) => {
  const { name, language, durationMinutes, points, startDate, startTime } = exam;
  const startsAt = parseExamDates({ startDate, startTime });

  try {
    const [{ examId }] = await db
      .insert(exams)
      .values({
        courseId,
        name,
        language,
        startsAt,
        points: Number(points),
        durationMinutes: Number(durationMinutes),
      })
      .returning({ examId: exams.id });

    await Promise.all(
      tasks.map(async ({ title, description, points, template }, idx) => {
        const templateRef = ref(fbStorage, `course_${courseId}/exam_${examId}/${title}/template`);
        const snapshot = await uploadString(templateRef, template, "raw");
        const templateUrl = await getDownloadURL(snapshot.ref);

        return db.insert(tasksTable).values({
          examId,
          title,
          templateUrl,
          description,
          orderIndex: idx,
          points: Number(points),
        });
      }),
    );

    // TODO: Notify students about new exam
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to create exam!");
  }

  return true;
};

type UpdateExamOptions = Pick<ExamSchema, "name" | "durationMinutes" | "startDate" | "startTime"> & {
  examId: string;
};

export const updateExam = async (options: UpdateExamOptions) => {
  const { examId, name, durationMinutes, startDate, startTime } = options;
  const startsAt = parseExamDates({ startDate, startTime });

  try {
    await db
      .update(exams)
      .set({ name, startsAt, durationMinutes: Number(durationMinutes) })
      .where(eq(exams.id, examId));

    // TODO: Notify students that exam has been updated
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to update exam!");
  }

  return true;
};

export const cancelExam = async (examId: string) => {
  try {
    await db.delete(exams).where(eq(exams.id, examId));
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to cancel exam");
  }

  return true;
};
