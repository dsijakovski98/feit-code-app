import { PropsWithChildren, Suspense, lazy, useMemo } from "react";

import StatCard from "@/components/Dashboards/NumStats/StatCard";

import { FCProfessor, FCStudent, FCUser } from "@/hooks/useFCUser";
import { USER_TYPE, UserType } from "@/types";
import { type NumStats } from "@/types/stats";
import { getAcademicYear } from "@/utils";

const ProfessorUpcomingExam = lazy(
  () => import("@/components/Dashboards/NumStats/UpcomingExam/ProfessorUpcomingExam"),
);
const StudentUpcomingExam = lazy(
  () => import("@/components/Dashboards/NumStats/UpcomingExam/StudentUpcomingExam"),
);

type Props = { user?: NonNullable<FCUser>["user"]; type: UserType } & NumStats & PropsWithChildren;

const NumStats = ({ courses, exams, user, type, children }: Props) => {
  const academicYear = useMemo(() => getAcademicYear(), []);

  const entityAction = useMemo(() => (type === USER_TYPE.student ? "taken during" : "created for"), [type]);

  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-6 xl:grid-cols-2 md:grid-cols-1">
      <StatCard
        icon="exam"
        value={exams}
        label="Total Exams"
        description={`Total number of exams ${entityAction} ${academicYear}`}
      />

      {children}

      <StatCard
        icon="course"
        value={courses}
        label="Total Courses"
        description={`Total number of courses ${entityAction} ${academicYear}`}
      />

      <StatCard icon="exam" variant="highlight" label="Upcoming Exam" description={`Latest upcoming exam`}>
        <Suspense fallback={null}>
          {type === USER_TYPE.student && <StudentUpcomingExam user={user as FCStudent} />}
          {type === USER_TYPE.professor && <ProfessorUpcomingExam user={user as FCProfessor} />}
        </Suspense>
      </StatCard>
    </div>
  );
};

export default NumStats;
