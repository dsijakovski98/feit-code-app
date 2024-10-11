import { useMemo } from "react";

import { Spinner } from "@nextui-org/react";

import ExamsList from "@/components/Exams/ExamsList";
import EmptyExamsList from "@/components/Exams/Misc/EmptyExamsList";
import ExamHeader from "@/components/Exams/Misc/ExamHeader";
import ExamCard from "@/components/Exams/ProfessorExams/ExamCard";
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

  const examsQuery = useProfessorExams({
    userId: id,
    courseId: selectedCourseId,
    status: statusFilter.value,
  });

  const { data, isLoading } = examsQuery;

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-4 py-4">
      <section className="space-y-2 lg:space-y-3">
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

        {isLoading && (
          <div className="w-full py-8 text-center">
            <Spinner size="lg" />
          </div>
        )}

        {data?.pages[0].length === 0 && (
          <EmptyExamsList status={statusFilter.value} course={courseFilter.value} />
        )}

        {!!data?.pages[0].length && (
          <section className="overflow-x-clip">
            <ExamsList examsQuery={examsQuery} renderExam={(exam) => <ExamCard exam={exam} />} />
          </section>
        )}
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
