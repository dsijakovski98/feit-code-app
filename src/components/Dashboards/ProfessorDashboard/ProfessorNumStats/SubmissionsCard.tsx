import StatCard from "@/components/Dashboards/NumStats/StatCard";

const SubmissionsCard = () => {
  // TODO: Professor number of submissions query
  return (
    <StatCard
      icon="grade"
      variant="highlight"
      value={1243}
      label="Submissions Graded"
      description="Total number of submissions graded."
    />
  );
};

export default SubmissionsCard;
