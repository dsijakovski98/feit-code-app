// * Grade rules
// 0% - 50%      => 5
// 51% - 60%     => 6
// 61% - 70%     => 7
// 71% - 80%     => 8
// 81% - 90%     => 9
// 91% - 100%    => 10

export const GRADE_RULES = [
  ["0% - 50%", "5"],
  ["51% - 60%", "6"],
  ["61% - 70%", "7"],
  ["71% - 80%", "8"],
  ["81% - 90%", "9"],
  ["91% - 100%", "10"],
] as const;

type GradeOptions = {
  totalPoints: number;
  examPoints: number;
};
export const calculateCourseGrade = ({ totalPoints, examPoints }: GradeOptions) => {
  const percentage = Math.round((examPoints / totalPoints) * 100);
  console.log({ examPoints, totalPoints });
  console.log({ percentage });

  if (percentage <= 50) return 5;

  if (percentage <= 60) return 6;

  if (percentage <= 70) return 7;

  if (percentage <= 80) return 8;

  if (percentage <= 90) return 9;

  return 10;
};
