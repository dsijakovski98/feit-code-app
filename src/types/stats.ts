export type CourseDetailsStats = Array<{
  exam: string;
  totalPoints: number;
  points: number | null;
  percentage: number;
}>;

export type CourseStats = Array<{ course: string; value: number }>;
