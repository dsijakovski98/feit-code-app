import NumStats from "@/components/Dashboards/NumStats";
import SubmissionsCard from "@/components/Dashboards/ProfessorDashboard/ProfessorNumStats/SubmissionsCard";

const ProfessorNumStats = () => {
  // TODO: Professor num stats query
  return (
    <NumStats courses={12344} exams={13}>
      <SubmissionsCard />
    </NumStats>
  );
};

export default ProfessorNumStats;
