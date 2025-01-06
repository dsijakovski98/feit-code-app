import { useMemo } from "react";

import ExamsList from "@/components/Exams/ExamsList";
import ExamHeader from "@/components/Exams/Misc/ExamHeader";
import StudentExamsStats from "@/components/Exams/StudentExams/StudentExamsStats";
import SelectFilter from "@/components/ui/Filters/SelectFilter";

import { ALL_OPTION } from "@/constants";
import { EXAM_STATUS_OPTIONS } from "@/constants/exams";
import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { FCStudent } from "@/hooks/useFCUser";
import { Option, useFilter } from "@/hooks/useFilter";
import { USER_TYPE } from "@/types";

type Props = {
  user: FCStudent;
};

const StudentExams = ({ user }: Props) => {
  const { id } = user;

  const { data: courses, isPending } = useStudentCoursesList(id);

  const courseOptions = useMemo<Option[]>(
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
    if (!courses || courses?.length === 0) return "";

    if (courseFilter.value === "all") return courseFilter.value;

    const course = courses?.find((course) => course.name === courseFilter.value);

    return course?.id || "";
  }, [courseFilter.value, courses]);

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-4 py-4 lg:h-auto lg:gap-12 lg:pb-20">
      <section className="min-h-[320px] space-y-2">
        <ExamHeader title="Exams">
          <SelectFilter size="sm" label="Exam status" filter={statusFilter} className="w-[240px] lg:w-full" />

          <SelectFilter
            size="sm"
            label="Course"
            filter={courseFilter}
            isLoading={isPending}
            className="w-[240px] lg:w-full"
          />
        </ExamHeader>

        <ExamsList
          userId={id}
          type={USER_TYPE.student}
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

        <StudentExamsStats studentId={id} selectedCourseId={selectedCourseId} courseIds={courseIds} />
      </section>
    </div>
  );
};

export default StudentExams;
