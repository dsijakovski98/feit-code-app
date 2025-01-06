import { useMemo } from "react";

import ExamsList from "@/components/Exams/ExamsList";
import ExamHeader from "@/components/Exams/Misc/ExamHeader";
import ProfessorExamsStats from "@/components/Exams/ProfessorExams/ProfessorExamsStats";
import SelectFilter from "@/components/ui/Filters/SelectFilter";

import { ALL_OPTION } from "@/constants";
import { EXAM_STATUS_OPTIONS } from "@/constants/exams";
import { useProfessorCoursesList } from "@/hooks/professor/useProfessorCoursesList";
import { FCProfessor } from "@/hooks/useFCUser";
import { useFilter } from "@/hooks/useFilter";
import { USER_TYPE } from "@/types";

type Props = {
  user: FCProfessor;
};

const ProfessorExams = ({ user }: Props) => {
  const { id, type } = user;

  const { data: courses, isLoading: coursesLoading } = useProfessorCoursesList({ userId: id, type });

  const courseOptions = useMemo(
    () => courses?.map(({ name }) => ({ value: name, label: name })) ?? [],
    [courses],
  );

  const courseIds = useMemo(() => courses?.map((course) => course.id) ?? [], [courses]);

  const courseFilter = useFilter({
    name: "course",
    options: [ALL_OPTION, ...courseOptions],
    defaultValue: "all",
  });

  const statusFilter = useFilter({
    name: "status",
    options: [ALL_OPTION, ...EXAM_STATUS_OPTIONS],
    defaultValue: "all",
  });

  const selectedCourseId = useMemo(() => {
    if (courseFilter.value === "all") return courseFilter.value;

    const course = courses?.find((course) => course.name === courseFilter.value);
    return course?.id || "";
  }, [courseFilter.value, courses]);

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-4 py-4 lg:h-auto lg:gap-12 lg:pb-20">
      <section className="min-h-[320px] space-y-2">
        <ExamHeader title="My Exams">
          <SelectFilter size="sm" label="Exam status" filter={statusFilter} className="w-[240px] lg:w-full" />
          <SelectFilter
            size="sm"
            label="Course"
            filter={courseFilter}
            isLoading={coursesLoading}
            className="w-[240px] lg:w-full"
          />
        </ExamHeader>

        <ExamsList
          userId={id}
          type={USER_TYPE.professor}
          status={statusFilter.value}
          course={courseFilter.value}
          selectedCourseId={selectedCourseId}
        />
      </section>

      <section className="flex flex-col gap-3 px-8">
        <div>
          <h2 className="text-lg font-bold uppercase text-foreground/90">Stats</h2>
          <p className="text-foreground-300">Last 10 exams (per course)</p>
        </div>

        <ProfessorExamsStats professorId={id} selectedCourseId={selectedCourseId} courseIds={courseIds} />
      </section>
    </div>
  );
};

export default ProfessorExams;
