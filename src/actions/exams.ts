import dayjs from "dayjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { exams, tasks as tasksTable } from "@/db/schema";

import { fbStorage } from "@/services/firebase";

import { TaskType } from "@/context/ExamFormContext";
import { db } from "@/db";
import { ExamSchema } from "@/utils/formSchemas/exams/examSchema";

type CreateExamOptions = {
  courseId: string;
  exam: ExamSchema;
  tasks: TaskType[];
};
export const createExam = async ({ courseId, exam, tasks }: CreateExamOptions) => {
  const { name, language, durationMinutes, points, startDate, startTime } = exam;
  const parsedDate = dayjs(startDate).format("YYYY-MM-DD");
  const parsedTime = dayjs(startTime).format("HH:MM");
  const startsAt = `${parsedDate} ${parsedTime}`;

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
