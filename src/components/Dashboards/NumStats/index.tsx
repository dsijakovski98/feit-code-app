import { PropsWithChildren, useMemo } from "react";

import StatCard from "@/components/Dashboards/NumStats/StatCard";
import UpcomingExam from "@/components/Dashboards/NumStats/UpcomingExam";

import { type NumStats } from "@/types/stats";
import { getAcademicYear } from "@/utils";

type Props = NumStats & PropsWithChildren;

const NumStats = ({ courses, exams, children }: Props) => {
  const academicYear = useMemo(() => getAcademicYear(), []);

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-6 xl:grid-cols-2 md:grid-cols-1">
      <StatCard
        icon="exam"
        value={exams}
        label="Total Exams"
        description={`Total number of exams taken during ${academicYear}.`}
      />

      {children}

      <StatCard
        icon="course"
        value={courses}
        label="Total Courses"
        description={`Total number of courses taken during ${academicYear}.`}
      />

      <StatCard icon="exam" variant="highlight" label="Upcoming Exam" description={`Latest upcoming exam.`}>
        <UpcomingExam />
      </StatCard>
    </div>
  );
};

export default NumStats;
