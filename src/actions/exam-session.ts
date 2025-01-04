import { Dayjs } from "dayjs";
import { onValue, push, ref, remove, set } from "firebase/database";
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

const cleanUpExamSessionStorage = (examSessionKey: string) => {
  const sessionStorageKeys = Object.keys(sessionStorage);

  // Clean up session storage of user, related to the exam session
  sessionStorageKeys.forEach((sessionStorageKey) => {
    if (sessionStorageKey.startsWith(examSessionKey)) {
      sessionStorage.removeItem(sessionStorageKey);
    }
  });
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

type LeaveSessionLogout = {
  studentId: string;
};
export const leaveExamSessionLogout = async ({ studentId }: LeaveSessionLogout) => {
  const activeExamsRef = ref(fbDatabase, "exams");

  await new Promise((resolve) => {
    onValue(
      activeExamsRef,
      async (snapshot) => {
        const examSessions = snapshot.val() as Record<string, ExamStats> | null;

        if (!examSessions) {
          return resolve(false);
        }

        const sessionKeys = Object.keys(examSessions);

        sessionKeys.forEach((key: keyof typeof examSessions) => {
          const activeStudents = examSessions[key].activeStudents;

          if (!activeStudents) return;

          const activeStudent = Object.entries(activeStudents).find(
            ([, studentSession]) => studentSession.student.id === studentId,
          );

          if (activeStudent) {
            const studentSessionId = activeStudent[0];

            cleanUpExamSessionStorage(studentSessionId);
            delete examSessions[key].activeStudents[studentSessionId];
          }
        });

        set(activeExamsRef, examSessions);
        resolve(true);
      },
      { onlyOnce: true },
    );
  });
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

        const timestamp = startTime.format("YYYY-MM-DD HH:mm:ss");

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

// Student submitting finished exam
type FinishExamOptions = Pick<ExamSessionContext, "exam" | "tasksState" | "student"> & {
  stats: Pick<StudentSession, "pasteCount" | "timeOff">;
};
export const finishExam = async ({ exam, tasksState, student, stats }: FinishExamOptions) => {
  try {
    const [tasks] = tasksState;
    const { courseId, id: examId } = exam;

    // Upload tasks content
    await Promise.all(
      exam.tasks.map(async (task) => {
        const taskPath = taskTemplateRef({ courseId, examId, taskTitle: task.title });
        const studentPath = studentTaskRef(student);
        const templateRef = storageRef(fbStorage, `${taskPath}/${studentPath}`);

        await uploadString(templateRef, tasks[task.id].code, "raw");
      }),
    );

    // Add submission to DB
    await db.insert(submissions).values({
      examId,
      studentId: student.id,
      ...stats,
    });

    // Check if exam session was already finished
    const examSessionRef = ref(fbDatabase, `exams/${exam.id}`);
    const examFinished = await new Promise((resolve) => {
      onValue(examSessionRef, (snapshot) => resolve(snapshot.val() === null), { onlyOnce: true });
    });

    if (examFinished) {
      // No need to update active/finished sessions if exam already ended
      return true;
    }

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

          const studentSessionKey = targetSession[0] as keyof typeof examSession;

          cleanUpExamSessionStorage(studentSessionKey);
          delete examSession[studentSessionKey];

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

    return true;
  } catch (e) {
    // Sentry logging
    console.log({ e });

    throw new Error("Failed to finish exam!");
  }
};

export const removeExamSession = async (examId: string) => {
  const examSessionRef = ref(fbDatabase, `exams/${examId}`);
  await remove(examSessionRef);
};

export type RunCodeOptions = {
  code: string;
  name: string;
  token: string;
  language: ProgrammingLanguage;
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
