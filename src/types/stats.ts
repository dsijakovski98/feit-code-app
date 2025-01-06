export type CourseDetailsStats = Array<{
  exam: string;
  totalPoints: number;
  points: number | null;
  percentage: number;
}>;

export type CourseStats = Array<{ course: string; value: number }>;

export type ExamKey = `exam${number}`;
export type ExamsStats = Array<
  { course: string; courseId: string; exams: Record<ExamKey, string> } & { [key in ExamKey]: number }
>;
