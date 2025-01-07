import NumStats from "@/components/Dashboards/NumStats";
import GradeCard from "@/components/Dashboards/StudentDashboard/StudentNumStats/GradeCard";

import { useStudentNumStats } from "@/hooks/student/useStudentNumStats";
import { useFCUser } from "@/hooks/useFCUser";

const StudentNumStats = () => {
  const { userData } = useFCUser();

  const { data: numStats } = useStudentNumStats(userData?.user.id ?? "");

  return (
    <NumStats {...numStats}>
      <GradeCard />
    </NumStats>
  );
};

export default StudentNumStats;
