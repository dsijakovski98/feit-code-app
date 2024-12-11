import { FCStudent } from "@/hooks/useFCUser";
import { TeacherType } from "@/types";

export type StudentSession = {
  student: FCStudent;
  pasteCount: number;
  timeOff?: Record<string, number>; // Key - start date, Value - duration in seconds
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
