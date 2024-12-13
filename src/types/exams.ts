import { FCStudent } from "@/hooks/useFCUser";
import { TeacherType } from "@/types";

export type SessionStats = {
  pasteCount: number;
  timeOff?: Record<string, number>; // Key - start date, Value - duration in seconds
};

export type StudentSession = SessionStats & {
  student: FCStudent;
  removed?: {
    teacherType: TeacherType;
    remover: string;
    reason?: string;
  };
};

export type ExamStats = {
  activeStudents: Record<string, StudentSession>;
  finishedStudents: Record<string, StudentSession>;
  finished?: boolean;
};
