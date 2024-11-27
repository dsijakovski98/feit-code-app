export type StudentSession = {
  userId: string;
  pasteCount: number;
  timeOff?: Record<string, number>; // Key - start date, Value - duration in seconds
};

export type ExamStats = {
  activeStudents: Record<string, StudentSession>;
  finishedStudents: Record<string, StudentSession>;
};
