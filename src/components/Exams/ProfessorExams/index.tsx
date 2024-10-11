import { useMemo } from "react";

import { Spinner } from "@nextui-org/react";

import ExamHeader from "@/components/Exams/Misc/ExamHeader";
import SelectFilter from "@/components/ui/Filters/SelectFilter";

import { EXAM_STATUS, ExamStatus } from "@/constants/enums";
import { useProfessorCoursesList } from "@/hooks/professor/useProfessorCoursesList";
import { useProfessorExams } from "@/hooks/professor/useProfessorExams";
import { FCProfessor } from "@/hooks/useFCUser";
import { Option, useFilter } from "@/hooks/useFilter";
import { parseExamStatus } from "@/utils";

const statusOptions = Object.values(EXAM_STATUS).map((status: ExamStatus) => ({
  value: status,
  label: parseExamStatus(status),
}));

const allOption: Option = { value: "all", label: "All" };

type Props = {
  user: FCProfessor;
};

const ProfessorExams = ({ user }: Props) => {
  const { id, type } = user;

  const { data: courses, isLoading: coursesLoading } = useProfessorCoursesList({ userId: id, type });
  const courseOptions = useMemo(
    () => courses?.map((course) => ({ value: course.name, label: course.name })) ?? [],
    [courses],
  );

  const courseFilter = useFilter({
    name: "course",
    options: [allOption, ...courseOptions],
    defaultValue: "all",
  });

  const statusFilter = useFilter({
    name: "status",
    options: [allOption, ...statusOptions],
    defaultValue: "all",
  });

  const selectedCourseId = useMemo(() => {
    if (courseFilter.value === "all") return courseFilter.value;

    const course = courses?.find((course) => course.name === courseFilter.value);
    return course?.id || "";
  }, [courseFilter.value, courses]);

  const { data, isLoading } = useProfessorExams({
    userId: id,
    courseId: selectedCourseId,
    status: statusFilter.value,
  });

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-8 p-8 lg:px-5">
      <section className="space-y-2">
        <ExamHeader title="My Exams">
          <SelectFilter size="md" label="Status" filter={statusFilter} className="w-[240px] lg:w-full" />
          <SelectFilter
            size="md"
            label="Course"
            filter={courseFilter}
            isLoading={coursesLoading}
            className="w-[240px] lg:w-full"
          />
        </ExamHeader>

        {isLoading && (
          <div className="w-full py-8 text-center">
            <Spinner size="lg" />
          </div>
        )}

        {data?.pages[0].length === 0 && (
          <div className="grid place-items-center p-8 text-center">
            <p className="text-lg text-foreground-300">
              No{" "}
              {statusFilter.value === "all" ? (
                ""
              ) : (
                <span className="font-semibold">{parseExamStatus(statusFilter.value)}</span>
              )}{" "}
              exams found{" "}
              {courseFilter.value === "all" ? (
                ""
              ) : (
                <span>
                  for <span className="font-semibold">{courseFilter.value}</span>
                </span>
              )}
            </p>
          </div>
        )}

        {!!data?.pages[0].length && <section className="px-8">Exams list here</section>}
      </section>

      {/* TODO: Implement stats UI */}
      {!!data?.pages[0].length && (
        <section className="px-8">
          <h2 className="text-lg font-bold uppercase text-foreground/90">Stats</h2>
        </section>
      )}
    </div>
  );
};

export default ProfessorExams;
