import { onValue, push, ref, set } from "firebase/database";

import { fbDatabase } from "@/services/firebase";

import { ProgrammingLanguage } from "@/constants/enums";
import { ExamStats } from "@/types/exams";

const activeStudentsRef = (examId: string) => ref(fbDatabase, `exams/${examId}/activeStudents`);

type SessionOptions = {
  examId: string;
  studentId: string;
};

export const joinExamSession = async ({ examId, studentId }: SessionOptions) => {
  const sessionRef = activeStudentsRef(examId);

  onValue(
    sessionRef,
    (snapshot) => {
      const examSession: ExamStats["activeStudents"] | null = snapshot.val();

      if (!examSession) {
        push(sessionRef, studentId);

        return;
      }

      const studentJoined = Object.values(examSession).find((id) => id === studentId);

      if (studentJoined) return;

      push(sessionRef, studentId);
    },
    { onlyOnce: true },
  );
};

export const leaveExamSession = async ({ examId, studentId }: SessionOptions) => {
  const sessionRef = activeStudentsRef(examId);

  const leaveSuccess = await new Promise((resolve) => {
    onValue(
      sessionRef,
      async (snapshot) => {
        const examSession: ExamStats["activeStudents"] | null = snapshot.val();

        if (!examSession) {
          return resolve(false);
        }

        const targetStudent = Object.entries(examSession).find(([, id]) => id === studentId);

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

type RunCodeOptions = {
  code: string;
  name: string;
  language: ProgrammingLanguage;
};
export const runTaskCode = async ({ code, name, language }: RunCodeOptions) => {
  // TODO: Run code call to API

  return { code, name, language };
};
