export type StudentSession = {
  userId: string;
  pasteCount: number;
  // Time in seconds
  timeOff: number;
};

export type ExamStats = {
  activeStudents: StudentSession[];
  finishedStudents: StudentSession[];
};
