import { Dayjs } from "dayjs";
import { onValue, push, ref, set } from "firebase/database";

import { fbDatabase } from "@/services/firebase";

import { ProgrammingLanguage } from "@/constants/enums";
import { ExamStats, StudentSession } from "@/types/exams";

export type ExamSessionOptions = {
  examId: string;
  studentId: string;
};

const activeStudentsRef = (examId: string) => ref(fbDatabase, `exams/${examId}/activeStudents`);

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
