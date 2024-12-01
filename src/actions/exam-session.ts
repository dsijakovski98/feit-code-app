import { Dayjs } from "dayjs";
import { onValue, push, ref, set } from "firebase/database";
import { ref as storageRef, uploadString } from "firebase/storage";

import { submissions } from "@/db/schema";

import { fbDatabase, fbStorage } from "@/services/firebase";

import { ProgrammingLanguage } from "@/constants/enums";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { db } from "@/db";
import { FCStudent } from "@/hooks/useFCUser";
import { ExamStats, StudentSession } from "@/types/exams";
import { studentTaskRef, taskTemplateRef } from "@/utils/code";

export type SessionOptions = {
  examId: string;
  sessionId?: string;
};

const activeStudentsRef = (examId: string) => ref(fbDatabase, `exams/${examId}/activeStudents`);
const finishedStudentsRef = (examId: string) => ref(fbDatabase, `exams/${examId}/finishedStudents`);

const activeSessionRef = ({ examId, sessionId }: SessionOptions) => {
  return ref(fbDatabase, `exams/${examId}/activeStudents/${sessionId}`);
};

type JoinSessionOptions = {
  examId: string;
  student: FCStudent;
};
export const joinExamSession = async ({ examId, student }: JoinSessionOptions) => {
  const sessionRef = activeStudentsRef(examId);

  const sessionKey: string | null = await new Promise((resolve) => {
    onValue(
      sessionRef,
      async (snapshot) => {
        const examSession: ExamStats["activeStudents"] | null = snapshot.val();
        const studentData: StudentSession = { student, pasteCount: 0, timeOff: {} };

        if (!examSession) {
          const { key } = await push(sessionRef, studentData);
          return resolve(key);
        }

        const studentJoined = Object.entries(examSession).find(
          ([, studentData]) => studentData.student.id === student.id,
        );

        if (studentJoined) {
          return resolve(studentJoined[0]);
        }

        const { key } = await push(sessionRef, studentData);
        resolve(key);
      },
      { onlyOnce: true },
    );
  });

  return sessionKey;
};

export const leaveExamSession = async ({ examId, sessionId }: SessionOptions) => {
  if (!sessionId) throw new Error(`Session ID missing!`);

  const sessionRef = activeStudentsRef(examId);

  const leaveSuccess = await new Promise((resolve, reject) => {
    onValue(
      sessionRef,
      (snapshot) => {
        const examSession: ExamStats["activeStudents"] | null = snapshot.val();

        if (!examSession) {
          return reject(`Exam session doesn't exist!`);
        }

        if (!examSession[sessionId]) {
          return reject(`Student session doesn't exist!`);
        }

        delete examSession[sessionId];
        set(sessionRef, examSession);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });

  return leaveSuccess;
};

export const handlePasteDetect = async ({ examId, sessionId }: SessionOptions) => {
  if (!sessionId) throw new Error(`Session ID missing!`);

  const sessionRef = activeSessionRef({ examId, sessionId });

  await new Promise((resolve) => {
    onValue(
      sessionRef,
      async (snapshot) => {
        const session: StudentSession | null = snapshot.val();

        if (!session) {
          return resolve(false);
        }

        session.pasteCount++;

        set(sessionRef, session);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });
};

type TimeOffOptions = { timeOff: number; startTime: Dayjs } & SessionOptions;
export const handleSessionTimeOff = async ({ examId, sessionId, timeOff, startTime }: TimeOffOptions) => {
  const sessionRef = activeSessionRef({ examId, sessionId });

  await new Promise((resolve) => {
    onValue(
      sessionRef,
      (snapshot) => {
        const session: StudentSession | null = snapshot.val();

        if (!session) {
          return resolve(false);
        }

        const timestamp = startTime.format("YYYY-MM-DD HH:MM:ss");

        if (session.timeOff) {
          session.timeOff[timestamp] = timeOff;
        } else {
          session.timeOff = { [timestamp]: timeOff };
        }

        set(sessionRef, session);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });
};

type RemoveSessionOptions = SessionOptions & Pick<StudentSession, "removed">;
export const removeStudentSession = async ({ examId, sessionId, removed }: RemoveSessionOptions) => {
  const sessionRef = activeSessionRef({ examId, sessionId });

  const result = await new Promise((resolve, reject) => {
    onValue(
      sessionRef,
      (snapshot) => {
        const session: StudentSession | null = snapshot.val();

        if (!session) {
          return reject(`Session doesn't exist!`);
        }

        session.removed = removed;
        set(sessionRef, session);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });

  return result;
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
            ([, sessionData]) => sessionData.student.id === student.id,
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
            (studentData) => studentData.student.id === student.id,
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

type RunCodeOptions = {
  code: string;
  name: string;
  language: ProgrammingLanguage;
  token: string;
};
export const runTaskCode = async ({ code, name, language, token }: RunCodeOptions) => {
  const response = await fetch(`${import.meta.env.VITE_CODE_RUNNER_URL}/run`, {
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
