import { FCStudent } from "@/hooks/useFCUser";

export type StudentSession = {
  student: FCStudent;
  pasteCount: number;
  timeOff?: Record<string, number>; // Key - start date, Value - duration in seconds
};

export type ExamStats = {
  activeStudents: Record<string, StudentSession>;
  finishedStudents: Record<string, StudentSession>;
};
