import { useMemo } from "react";

import StatCard from "@/components/Dashboards/NumStats/StatCard";

import { useStudentCoursesStats } from "@/hooks/student/useStudentCoursesStats";
import { useFCUser } from "@/hooks/useFCUser";

const GradeCard = () => {
  const { userData } = useFCUser();
  const { data: stats } = useStudentCoursesStats(userData?.user.id ?? "");

  const avgValue = useMemo(() => {
    if (!stats || stats.length === 0) return "-";

    const avg = stats.reduce((acc, stat) => acc + stat.value, 0) / stats.length;

    return Number(avg.toFixed(2));
  }, [stats]);

  return (
    <StatCard
      value={avgValue}
      icon="cap"
      variant="highlight"
      label="Average Grade"
      description="Average grade calculated from all your courses."
    />
  );
};

export default GradeCard;
