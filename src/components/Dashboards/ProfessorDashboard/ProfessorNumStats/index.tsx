import NumStats from "@/components/Dashboards/NumStats";
import SubmissionsCard from "@/components/Dashboards/ProfessorDashboard/ProfessorNumStats/SubmissionsCard";

import { useProfessorNumStats } from "@/hooks/professor/useProfessorNumStats";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorNumStats = () => {
  const { userData } = useFCUser();

  const { data: numStats } = useProfessorNumStats(userData?.user.id ?? "");

  return (
    <NumStats {...numStats} type={USER_TYPE.professor}>
      <SubmissionsCard />
    </NumStats>
  );
};

export default ProfessorNumStats;
