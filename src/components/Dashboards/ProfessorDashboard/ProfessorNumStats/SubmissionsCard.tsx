import StatCard from "@/components/Dashboards/NumStats/StatCard";

import { useProfessorSubmissionsGraded } from "@/hooks/professor/useProfessorSubmissionsGraded";
import { useFCUser } from "@/hooks/useFCUser";

const SubmissionsCard = () => {
  const { userData } = useFCUser();

  const { data: submissionsGraded } = useProfessorSubmissionsGraded(userData?.user.id ?? "");

  return (
    <StatCard
      icon="grade"
      variant="highlight"
      value={submissionsGraded}
      label="Submissions Graded"
      description="Total number of submissions graded"
    />
  );
};

export default SubmissionsCard;
