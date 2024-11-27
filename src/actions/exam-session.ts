import { Dayjs } from "dayjs";
import { onValue, push, ref, set } from "firebase/database";
import { ref as storageRef, uploadString } from "firebase/storage";

import { submissions } from "@/db/schema";

import { fbDatabase, fbStorage } from "@/services/firebase";

import { ProgrammingLanguage } from "@/constants/enums";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { db } from "@/db";
import { ExamStats, StudentSession } from "@/types/exams";
import { studentTaskRef, taskTemplateRef } from "@/utils/code";

export type ExamSessionOptions = {
  examId: string;
  studentId: string;
};

const activeStudentsRef = (examId: string) => ref(fbDatabase, `exams/${examId}/activeStudents`);
const finishedStudentsRef = (examId: string) => ref(fbDatabase, `exams/${examId}/finishedStudents`);

export const joinExamSession = async ({ examId, studentId }: ExamSessionOptions) => {
  const sessionRef = activeStudentsRef(examId);

  onValue(
    sessionRef,
    (snapshot) => {
      const examSession: ExamStats["activeStudents"] | null = snapshot.val();
      const studentData: StudentSession = { userId: studentId, pasteCount: 0, timeOff: {} };

      if (!examSession) {
        push(sessionRef, studentData);

        return;
      }

      const studentJoined = Object.values(examSession).find(
        (studentData) => studentData.userId === studentId,
      );

      if (studentJoined) return;

      push(sessionRef, studentData);
    },
    { onlyOnce: true },
  );
};

export const leaveExamSession = async ({ examId, studentId }: ExamSessionOptions) => {
  const sessionRef = activeStudentsRef(examId);

  const leaveSuccess = await new Promise((resolve) => {
    onValue(
      sessionRef,
      (snapshot) => {
        const examSession: ExamStats["activeStudents"] | null = snapshot.val();

        if (!examSession) {
          return resolve(false);
        }

        const targetStudent = Object.entries(examSession).find(
          ([, studentData]) => studentData.userId === studentId,
        );

        if (!targetStudent) {
          return resolve(false);
        }

        delete examSession[targetStudent[0] as keyof typeof examSession];
        set(sessionRef, examSession);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });

  return leaveSuccess;
};

export const handlePasteDetect = async ({ examId, studentId }: ExamSessionOptions) => {
  const sessionRef = activeStudentsRef(examId);

  await new Promise((resolve) => {
    onValue(
      sessionRef,
      async (snapshot) => {
        const examSession: ExamStats["activeStudents"] | null = snapshot.val();

        if (!examSession) {
          return resolve(false);
        }

        const targetStudent = Object.entries(examSession).find(
          ([, studentData]) => studentData.userId === studentId,
        );

        if (!targetStudent) {
          return resolve(false);
        }

        const studentKey = targetStudent[0] as keyof typeof examSession;
        examSession[studentKey].pasteCount++;

        set(sessionRef, examSession);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });
};

type TimeOffOptions = { timeOff: number; startTime: Dayjs } & ExamSessionOptions;
export const handleSessionTimeOff = async ({ examId, studentId, timeOff, startTime }: TimeOffOptions) => {
  const sessionRef = activeStudentsRef(examId);

  await new Promise((resolve) => {
    onValue(
      sessionRef,
      (snapshot) => {
        const examSession: ExamStats["activeStudents"] | null = snapshot.val();

        if (!examSession) {
          return resolve(false);
        }

        const targetStudent = Object.entries(examSession).find(
          ([, studentData]) => studentData.userId === studentId,
        );

        if (!targetStudent) {
          return resolve(false);
        }

        const studentKey = targetStudent[0] as keyof typeof examSession;
        const timestamp = startTime.format("YYYY-MM-DD HH:MM:ss");

        if (examSession[studentKey].timeOff) {
          examSession[studentKey].timeOff[timestamp] = timeOff;
        } else {
          examSession[studentKey].timeOff = { [timestamp]: timeOff };
        }

        set(sessionRef, examSession);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });
};

type RunCodeOptions = {
  code: string;
  name: string;
  language: ProgrammingLanguage;
  token: string;
};
export const runTaskCode = async ({ code, name, language, token }: RunCodeOptions) => {
  const response = await fetch("http://localhost:4000/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, code, language }),
  });

  if (!response.ok) {
    const { error } = (await response.json()) as { error: string };
    throw new Error(error);
  }

  const { output } = (await response.json()) as { output: string };

  return output;
};

type FinishExamOptions = Pick<ExamSessionContext, "exam" | "tasksState" | "student">;
export const finishExam = async ({ exam, tasksState, student }: FinishExamOptions) => {
  try {
    const [tasks] = tasksState;
    const { courseId, id: examId } = exam;

    // Upload tasks content
    await Promise.all(
      exam.tasks.map((task) => {
        const taskPath = taskTemplateRef({ courseId, examId, taskTitle: task.title });
        const studentPath = studentTaskRef(student);
        const templateRef = storageRef(fbStorage, `${taskPath}/${studentPath}`);

        return uploadString(templateRef, tasks[task.id].code, "raw");
      }),
    );

    // Move session from active to finished
    const activeSessionRef = activeStudentsRef(examId);
    const finishedSessionRef = finishedStudentsRef(examId);

    const finishedSession: StudentSession = await new Promise((resolve, reject) => {
      onValue(
        activeSessionRef,
        (snapshot) => {
          const examSession: ExamStats["activeStudents"] | null = snapshot.val();

          if (!examSession) {
            reject(`Exam session for exam ${examId} not available!`);

            return;
          }

          const targetSession = Object.entries(examSession).find(
            ([, sessionData]) => sessionData.userId === student.id,
          );

          if (!targetSession) {
            reject(`Exam session data for student ${student.id} not available!`);

            return;
          }

          const sessionKey = targetSession[0] as keyof typeof examSession;
          delete examSession[sessionKey];
          set(activeSessionRef, examSession);

          resolve(targetSession[1]);
        },
        { onlyOnce: true },
      );
    });

    await new Promise((resolve, reject) => {
      onValue(
        finishedSessionRef,
        (snapshot) => {
          const sessionFinish: ExamStats["finishedStudents"] | null = snapshot.val();

          if (!sessionFinish) {
            push(finishedSessionRef, finishedSession);
            resolve(true);

            return;
          }

          const studentFinished = !!Object.values(sessionFinish).find(
            (studentData) => studentData.userId === student.id,
          );

          if (studentFinished) {
            reject(`Student ${student.id} has already finished exam ${examId}!`);

            return;
          }

          push(finishedSessionRef, finishedSession);
          resolve(true);
        },
        { onlyOnce: true },
      );
    });

    // Add submission to DB
    await db.insert(submissions).values({
      examId,
      studentId: student.id,
    });

    return true;
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to finish exam!");
  }
};
