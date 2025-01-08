import { PropsWithChildren, useMemo } from "react";

import StatCard from "@/components/Dashboards/NumStats/StatCard";
import UpcomingExam from "@/components/Dashboards/NumStats/UpcomingExam";

import { USER_TYPE, UserType } from "@/types";
import { type NumStats } from "@/types/stats";
import { getAcademicYear } from "@/utils";

type Props = { type: UserType } & NumStats & PropsWithChildren;

const NumStats = ({ courses, exams, type, children }: Props) => {
  const academicYear = useMemo(() => getAcademicYear(), []);

  const entityAction = useMemo(() => (type === USER_TYPE.student ? "taken during" : "created for"), [type]);

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-6 xl:grid-cols-2 md:grid-cols-1">
      <StatCard
        icon="exam"
        value={exams}
        label="Exams"
        description={`Total number of exams ${entityAction} ${academicYear}`}
      />

      {children}

      <StatCard
        icon="course"
        value={courses}
        label="Courses"
        description={`Total number of courses ${entityAction} ${academicYear}`}
      />

      <StatCard icon="exam" variant="highlight" label="Upcoming Exam" description={`Latest upcoming exam`}>
        <UpcomingExam />
      </StatCard>
    </div>
  );
};

export default NumStats;
